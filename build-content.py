#!/usr/bin/env python3
"""
『欲望という名の電車』オンライン講義
CSV → JSON 自動変換スクリプト

使用方法:
  python3 build-content.py

このスクリプトは raw-content/ フォルダの CSV ファイルを読み込み、
JSON に変換して public/data/ に出力します。

対応ファイル:
  - raw-content/courses.csv → public/data/courses.json
  - raw-content/episodes.csv → public/data/episodes.json
"""

import csv
import json
import os
import sys
from pathlib import Path


def load_csv(filepath):
    """CSV ファイルを辞書のリストとして読み込む"""
    if not os.path.exists(filepath):
        print(f"⚠️  {filepath} が見つかりません。スキップします。")
        return None

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            data = list(reader)
        return data
    except Exception as e:
        print(f"❌ エラー: {filepath} を読み込みできませんでした")
        print(f"   {e}")
        return None


def convert_courses(courses_data):
    """コース CSV を JSON に変換"""
    if not courses_data:
        return None

    courses = []
    for row in courses_data:
        try:
            course = {
                "id": row['id'].strip(),
                "title": row['title'].strip(),
                "subtitle": row['subtitle'].strip(),
                "description": row['description'].strip(),
                "order": int(row['order']),
                "episodes": []
            }
            courses.append(course)
        except Exception as e:
            print(f"⚠️  コース行のパース失敗: {row}")
            print(f"   {e}")
            continue

    # order でソート
    courses.sort(key=lambda x: x['order'])
    return courses


def convert_episodes(episodes_data):
    """エピソード CSV を JSON に変換"""
    if not episodes_data:
        return None

    episodes = []
    for row in episodes_data:
        try:
            episode = {
                "id": row['id'].strip(),
                "courseId": row['courseId'].strip(),
                "title": row['title'].strip(),
                "description": row['description'].strip(),
                "duration": row['duration'].strip(),
                "youtubeId": row['youtubeId'].strip() if row.get('youtubeId') else "",
                "transcript": "",
                "order": int(row['order'])
            }
            episodes.append(episode)
        except Exception as e:
            print(f"⚠️  エピソード行のパース失敗: {row}")
            print(f"   {e}")
            continue

    # courseId と order でソート
    episodes.sort(key=lambda x: (x['courseId'], x['order']))
    return episodes


def write_json(filepath, data):
    """JSON ファイルに書き込む"""
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"❌ エラー: {filepath} に書き込みできませんでした")
        print(f"   {e}")
        return False


def main():
    """メイン処理"""
    script_dir = Path(__file__).parent
    raw_content_dir = script_dir / 'raw-content'
    output_dir = script_dir / 'public' / 'data'

    print("=" * 60)
    print("『欲望という名の電車』 - コンテンツビルド")
    print("=" * 60)

    # 1. Courses
    print("\n📋 コース情報を処理中...")
    courses_csv = raw_content_dir / 'courses.csv'
    courses_data = load_csv(courses_csv)
    if courses_data:
        courses_json = convert_courses(courses_data)
        if courses_json and write_json(output_dir / 'courses.json', courses_json):
            print(f"✅ courses.json を生成しました（{len(courses_json)} コース）")
        else:
            print("❌ courses.json の生成に失敗しました")

    # 2. Episodes
    print("\n📺 講義情報を処理中...")
    episodes_csv = raw_content_dir / 'episodes.csv'
    episodes_data = load_csv(episodes_csv)
    if episodes_data:
        episodes_json = convert_episodes(episodes_data)
        if episodes_json and write_json(output_dir / 'episodes.json', episodes_json):
            print(f"✅ episodes.json を生成しました（{len(episodes_json)} 講義）")
        else:
            print("❌ episodes.json の生成に失敗しました")

    print("\n" + "=" * 60)
    print("✨ ビルド完了！")
    print("=" * 60)
    print("\n📖 ブラウザをリロードして確認してください:")
    print("   http://localhost:8000\n")


if __name__ == '__main__':
    main()
