#!/usr/bin/env python3
"""
Debug script to specifically check database sync issues
"""
import sys
import os
import sqlite3
from pathlib import Path

# Add the backend path to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'file-system')
sys.path.insert(0, backend_path)

from silan.logic.content_logic import ContentLogic
from silan.logic.database_sync_logic import DatabaseSyncLogic

def check_database_issues():
    """Check database sync issues"""
    print("🔍 Database Sync Issue Analysis")
    print("=" * 50)
    
    # First check what's being parsed
    content_logic = ContentLogic()
    sync_content = content_logic.get_all_content_for_sync()
    
    print("📝 Parsed Content Summary:")
    for content_type in ['projects', 'resume']:
        items = [item for item in sync_content if item['type'] == content_type]
        print(f"   {content_type}: {len(items)} items")
        for item in items:
            print(f"     - {item['name']}: {item['data'].get('title', 'NO TITLE')}")
            if content_type == 'projects':
                print(f"       Slug: {item['data'].get('slug', 'NO SLUG')}")
            if content_type == 'resume':
                print(f"       Education: {len(item['data'].get('education', []))} items")
                print(f"       Experience: {len(item['data'].get('experience', []))} items")
                print(f"       Awards: {len(item['data'].get('awards', []))} items")
    
    # Now check what's in the database after sync
    print("\n📊 Database Content Check:")
    db_path = Path.cwd() / "portfolio.db"
    if db_path.exists():
        with sqlite3.connect(str(db_path)) as conn:
            cursor = conn.cursor()
            
            # Check projects
            cursor.execute("SELECT title, slug FROM projects")
            projects = cursor.fetchall()
            print(f"   Projects in DB: {len(projects)}")
            for title, slug in projects:
                print(f"     - {title}: {slug}")
            
            # Check resume-related tables
            for table_name in ['education', 'work_experience', 'awards']:
                cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
                count = cursor.fetchone()[0]
                print(f"   {table_name}: {count} records")
                
                if count > 0:
                    cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
                    sample = cursor.fetchone()
                    print(f"     Sample: {sample}")
    else:
        print("   ❌ Database file not found")

if __name__ == "__main__":
    check_database_issues()