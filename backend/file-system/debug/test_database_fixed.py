#!/usr/bin/env python3
"""
Database Structure and Data Verification Script (Fixed)
Tests all database tables to ensure sync worked correctly
"""

import sqlite3
import json
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

# Database path
DB_PATH = "/Users/macbook.silan.tech/Documents/GitHub/AIPro-Resume/api-test-portfolio/portfolio.db"

def connect_to_database() -> sqlite3.Connection:
    """Connect to the SQLite database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  # Enable column access by name
        return conn
    except sqlite3.Error as e:
        print(f"❌ Database connection error: {e}")
        sys.exit(1)

def print_section(title: str) -> None:
    """Print a formatted section header"""
    print(f"\n{'='*60}")
    print(f"📋 {title}")
    print(f"{'='*60}")

def test_actual_data_content(conn: sqlite3.Connection) -> None:
    """Test actual data content in key tables"""
    print_section("ACTUAL DATA VERIFICATION")
    
    cursor = conn.cursor()
    
    # Test Users
    print("\n👤 USERS TABLE:")
    cursor.execute("SELECT username, email, first_name, last_name, is_active FROM users")
    users = cursor.fetchall()
    if users:
        for user in users:
            print(f"   ✅ User: {user['username']} ({user['first_name']} {user['last_name']})")
            print(f"      Email: {user['email']}")
            print(f"      Active: {'Yes' if user['is_active'] else 'No'}")
    else:
        print("   ❌ No users found")
    
    # Test Blog Posts
    print("\n📝 BLOG POSTS TABLE:")
    cursor.execute("SELECT id, title, slug, content, is_featured, published_at FROM blog_posts")
    posts = cursor.fetchall()
    print(f"   📊 Total blog posts: {len(posts)}")
    if posts:
        for post in posts:
            print(f"   ✅ Post: {post['title']}")
            print(f"      Slug: {post['slug']}")
            print(f"      Content length: {len(post['content']) if post['content'] else 0} chars")
            print(f"      Featured: {'Yes' if post['is_featured'] else 'No'}")
            print(f"      Published: {post['published_at']}")
    else:
        print("   ❌ No blog posts found")
    
    # Test Projects
    print("\n🚀 PROJECTS TABLE:")
    cursor.execute("SELECT id, title, slug, description, github_url, demo_url, is_featured FROM projects")
    projects = cursor.fetchall()
    print(f"   📊 Total projects: {len(projects)}")
    if projects:
        for project in projects:
            print(f"   ✅ Project: {project['title']}")
            print(f"      Slug: {project['slug']}")
            desc = project['description'][:100] + "..." if project['description'] and len(project['description']) > 100 else project['description']
            print(f"      Description: {desc}")
            print(f"      GitHub: {project['github_url'] or 'None'}")
            print(f"      Demo: {project['demo_url'] or 'None'}")
            print(f"      Featured: {'Yes' if project['is_featured'] else 'No'}")
    else:
        print("   ❌ No projects found")
    
    # Test Ideas
    print("\n💡 IDEAS TABLE:")
    cursor.execute("SELECT id, title, slug, abstract, motivation FROM ideas")
    ideas = cursor.fetchall()
    print(f"   📊 Total ideas: {len(ideas)}")
    if ideas:
        for idea in ideas:
            print(f"   ✅ Idea: {idea['title']}")
            print(f"      Slug: {idea['slug']}")
            abstract = idea['abstract'][:100] + "..." if idea['abstract'] and len(idea['abstract']) > 100 else idea['abstract']
            print(f"      Abstract: {abstract or 'None'}")
            motivation = idea['motivation'][:100] + "..." if idea['motivation'] and len(idea['motivation']) > 100 else idea['motivation']
            print(f"      Motivation: {motivation or 'None'}")
    else:
        print("   ❌ No ideas found")
    
    # Test Recent Updates
    print("\n🔔 RECENT UPDATES TABLE:")
    cursor.execute("SELECT id, title, description, date, type FROM recent_updates")
    updates = cursor.fetchall()
    print(f"   📊 Total updates: {len(updates)}")
    if updates:
        for update in updates:
            print(f"   ✅ Update: {update['title']}")
            desc = update['description'][:100] + "..." if update['description'] and len(update['description']) > 100 else update['description']
            print(f"      Description: {desc}")
            print(f"      Date: {update['date']}")
            print(f"      Type: {update['type']}")
    else:
        print("   ❌ No recent updates found")

def test_content_count_analysis(conn: sqlite3.Connection) -> None:
    """Analyze content counts vs expected from files"""
    print_section("CONTENT COUNT ANALYSIS")
    
    cursor = conn.cursor()
    
    # Expected content based on directory structure
    expected_files = {
        'blog': 4,      # 4 blog markdown files
        'projects': 3,  # 3 project folders (ai-chatbot, data-visualization-tool, ecommerce-platform)
        'ideas': 2,     # 2 idea folders (ai-code-refactoring-tool, quantum-ml-framework)
        'updates': 5    # 5 update files
    }
    
    # Actual database counts
    actual_counts = {}
    
    cursor.execute("SELECT COUNT(*) FROM blog_posts")
    actual_counts['blog'] = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM projects")
    actual_counts['projects'] = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM ideas")
    actual_counts['ideas'] = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM recent_updates")
    actual_counts['updates'] = cursor.fetchone()[0]
    
    print("📊 Content Count Comparison:")
    print(f"{'Content Type':<15} {'Expected':<10} {'Actual':<10} {'Status':<10}")
    print("-" * 50)
    
    for content_type, expected in expected_files.items():
        actual = actual_counts.get(content_type, 0)
        status = "✅ PASS" if actual == expected else "❌ FAIL"
        print(f"{content_type:<15} {expected:<10} {actual:<10} {status:<10}")

def test_detailed_table_analysis(conn: sqlite3.Connection) -> None:
    """Detailed analysis of each table"""
    print_section("DETAILED TABLE ANALYSIS")
    
    cursor = conn.cursor()
    
    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]
    
    print(f"📊 Database contains {len(tables)} tables:")
    
    key_tables = ['users', 'blog_posts', 'projects', 'ideas', 'recent_updates', 'blog_tags', 'project_technologies']
    
    for table in key_tables:
        if table in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"   ✅ {table}: {count} records")
        else:
            print(f"   ❌ {table}: Table not found")
    
    # Other tables
    other_tables = [t for t in tables if t not in key_tables]
    if other_tables:
        print(f"\n📋 Other tables ({len(other_tables)}):")
        for table in other_tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"   • {table}: {count} records")

def test_blog_post_content(conn: sqlite3.Connection) -> None:
    """Test specific blog post content"""
    print_section("BLOG POST CONTENT ANALYSIS")
    
    cursor = conn.cursor()
    cursor.execute("SELECT title, slug, content, excerpt FROM blog_posts")
    posts = cursor.fetchall()
    
    if posts:
        for i, post in enumerate(posts, 1):
            print(f"\n📄 Blog Post {i}:")
            print(f"   Title: {post['title']}")
            print(f"   Slug: {post['slug']}")
            print(f"   Content length: {len(post['content']) if post['content'] else 0} characters")
            print(f"   Excerpt: {post['excerpt'][:100] + '...' if post['excerpt'] and len(post['excerpt']) > 100 else post['excerpt'] or 'None'}")
            
            # Check if content contains expected markdown
            if post['content']:
                has_headers = '#' in post['content']
                has_code = '```' in post['content']
                has_links = '[' in post['content'] and ']' in post['content']
                
                print(f"   Content analysis:")
                print(f"      Has headers: {'Yes' if has_headers else 'No'}")
                print(f"      Has code blocks: {'Yes' if has_code else 'No'}")
                print(f"      Has links: {'Yes' if has_links else 'No'}")
    else:
        print("❌ No blog posts found for analysis")

def test_project_details(conn: sqlite3.Connection) -> None:
    """Test specific project details"""
    print_section("PROJECT DETAILS ANALYSIS")
    
    cursor = conn.cursor()
    cursor.execute("SELECT title, slug, description, github_url, demo_url, project_type, status FROM projects")
    projects = cursor.fetchall()
    
    if projects:
        for i, project in enumerate(projects, 1):
            print(f"\n🚀 Project {i}:")
            print(f"   Title: {project['title']}")
            print(f"   Slug: {project['slug']}")
            print(f"   Type: {project['project_type']}")
            print(f"   Status: {project['status']}")
            print(f"   Description: {project['description'][:200] + '...' if project['description'] and len(project['description']) > 200 else project['description'] or 'None'}")
            print(f"   GitHub: {project['github_url'] or 'None'}")
            print(f"   Demo: {project['demo_url'] or 'None'}")
    else:
        print("❌ No projects found for analysis")

def main():
    """Main test function"""
    print("🔍 Database Content Verification (Fixed)")
    print(f"📍 Database Path: {DB_PATH}")
    
    # Check if database exists
    if not Path(DB_PATH).exists():
        print(f"❌ Database file not found: {DB_PATH}")
        sys.exit(1)
    
    # Connect to database
    conn = connect_to_database()
    
    try:
        # Test actual data content
        test_actual_data_content(conn)
        
        # Test content count analysis
        test_content_count_analysis(conn)
        
        # Test detailed table analysis
        test_detailed_table_analysis(conn)
        
        # Test blog post content
        test_blog_post_content(conn)
        
        # Test project details
        test_project_details(conn)
        
        print_section("SUMMARY")
        print("✅ Database content verification completed")
        print("📋 Review the analysis above to understand sync results")
        
    except Exception as e:
        print(f"❌ Error during testing: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    
    finally:
        conn.close()

if __name__ == "__main__":
    main()