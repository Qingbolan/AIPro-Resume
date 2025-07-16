#!/usr/bin/env python3
"""
API接口测试脚本
用于测试后端API的所有接口实现状态
Author: Claude Code
Date: 2025-07-16
"""

import requests
import json
import time
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from colorama import init, Fore, Back, Style
import sys

# 初始化colorama
init(autoreset=True)

@dataclass
class TestResult:
    """测试结果数据类"""
    endpoint: str
    method: str
    status_code: int
    response_time: float
    success: bool
    error_message: str = ""
    data_size: int = 0
    has_data: bool = False

class APITester:
    def __init__(self, base_url: str = "http://localhost:8888"):
        self.base_url = base_url
        self.results: List[TestResult] = []
        self.session = requests.Session()
        self.session.timeout = 10
        
    def test_endpoint(self, endpoint: str, method: str = "GET", 
                     data: Dict = None, params: Dict = None) -> TestResult:
        """测试单个API端点"""
        url = f"{self.base_url}{endpoint}"
        start_time = time.time()
        
        try:
            if method.upper() == "GET":
                response = self.session.get(url, params=params)
            elif method.upper() == "POST":
                response = self.session.post(url, json=data, params=params)
            elif method.upper() == "PUT":
                response = self.session.put(url, json=data, params=params)
            elif method.upper() == "DELETE":
                response = self.session.delete(url, params=params)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            response_time = time.time() - start_time
            
            # 判断是否成功
            success = 200 <= response.status_code < 300
            
            # 解析响应数据
            try:
                json_data = response.json()
                data_size = len(str(json_data))
                has_data = self._check_has_data(json_data)
            except:
                json_data = None
                data_size = len(response.text) if response.text else 0
                has_data = bool(response.text)
            
            result = TestResult(
                endpoint=endpoint,
                method=method,
                status_code=response.status_code,
                response_time=response_time,
                success=success,
                data_size=data_size,
                has_data=has_data,
                error_message="" if success else response.text[:200]
            )
            
        except requests.exceptions.RequestException as e:
            response_time = time.time() - start_time
            result = TestResult(
                endpoint=endpoint,
                method=method,
                status_code=0,
                response_time=response_time,
                success=False,
                error_message=str(e)[:200]
            )
        
        self.results.append(result)
        return result
    
    def _check_has_data(self, data: Any) -> bool:
        """检查响应是否包含有效数据"""
        if data is None:
            return False
        if isinstance(data, list):
            return len(data) > 0
        if isinstance(data, dict):
            if 'total' in data and data['total'] == 0:
                return False
            return bool(data)
        return bool(data)
    
    def run_all_tests(self):
        """运行所有API测试"""
        print(f"{Fore.CYAN}🚀 开始API接口测试...")
        print(f"{Fore.CYAN}Base URL: {self.base_url}")
        print("=" * 80)
        
        # Resume API组测试
        self._test_resume_apis()
        
        # Projects API组测试
        self._test_projects_apis()
        
        # Plans API组测试
        self._test_plans_apis()
        
        # Blog API组测试
        self._test_blog_apis()
        
        # Ideas API组测试
        self._test_ideas_apis()
        
        # 输出测试结果
        self._print_summary()
    
    def _test_resume_apis(self):
        """测试Resume API组"""
        print(f"\n{Fore.YELLOW}📋 Resume API组测试")
        print("-" * 40)
        
        endpoints = [
            "/api/v1/resume/",
            "/api/v1/resume/personal",
            "/api/v1/resume/education", 
            "/api/v1/resume/experience",
            "/api/v1/resume/research",
            "/api/v1/resume/publications",
            "/api/v1/resume/awards",
            "/api/v1/resume/recent"
        ]
        
        for endpoint in endpoints:
            result = self.test_endpoint(endpoint)
            self._print_result(result)
    
    def _test_projects_apis(self):
        """测试Projects API组"""
        print(f"\n{Fore.YELLOW}🚀 Projects API组测试")
        print("-" * 40)
        
        # 先获取项目列表，用于后续测试
        projects_result = self.test_endpoint("/api/v1/projects/")
        self._print_result(projects_result)
        
        # 获取第一个项目ID用于测试
        project_id = None
        try:
            response = self.session.get(f"{self.base_url}/api/v1/projects/")
            if response.status_code == 200:
                data = response.json()
                if data.get('projects') and len(data['projects']) > 0:
                    project_id = data['projects'][0]['id']
        except:
            pass
        
        # 测试其他项目接口
        endpoints = [
            "/api/v1/projects/categories",
            "/api/v1/projects/tags", 
            "/api/v1/projects/graph",
            "/api/v1/projects/search"
        ]
        
        for endpoint in endpoints:
            params = {"query": "AI"} if "search" in endpoint else None
            result = self.test_endpoint(endpoint, params=params)
            self._print_result(result)
        
        # 测试单个项目获取
        if project_id:
            result = self.test_endpoint(f"/api/v1/projects/id/{project_id}")
            self._print_result(result)
            
            # 测试项目详情
            result = self.test_endpoint(f"/api/v1/projects/{project_id}/detail")
            self._print_result(result)
            
            # 测试项目相关博客
            result = self.test_endpoint(f"/api/v1/projects/{project_id}/blogs")
            self._print_result(result)
        else:
            print(f"{Fore.RED}❌ 无法获取项目ID，跳过单项目测试")
    
    def _test_plans_apis(self):
        """测试Plans API组"""
        print(f"\n{Fore.YELLOW}📅 Plans API组测试")
        print("-" * 40)
        
        endpoints = [
            "/api/v1/plans/annual",
            "/api/v1/plans/annual/current",
            "/api/v1/plans/projects"
        ]
        
        for endpoint in endpoints:
            result = self.test_endpoint(endpoint)
            self._print_result(result)
        
        # 尝试获取特定年度计划
        result = self.test_endpoint("/api/v1/plans/annual/Annual Plan 2025")
        self._print_result(result)
        
        # 尝试获取计划下的项目
        result = self.test_endpoint("/api/v1/plans/Annual Plan 2025/projects")
        self._print_result(result)
    
    def _test_blog_apis(self):
        """测试Blog API组"""
        print(f"\n{Fore.YELLOW}📝 Blog API组测试")
        print("-" * 40)
        
        # 测试博客列表
        result = self.test_endpoint("/api/v1/blog/posts")
        self._print_result(result)
        
        # 测试分类和标签
        endpoints = [
            "/api/v1/blog/categories",
            "/api/v1/blog/tags"
        ]
        
        for endpoint in endpoints:
            result = self.test_endpoint(endpoint)
            self._print_result(result)
        
        # 测试搜索
        result = self.test_endpoint("/api/v1/blog/search", params={"query": "test"})
        self._print_result(result)
        
        # 测试单篇博客（如果有数据的话）
        try:
            response = self.session.get(f"{self.base_url}/api/v1/blog/posts")
            if response.status_code == 200:
                data = response.json()
                if data.get('posts') and len(data['posts']) > 0:
                    blog_id = data['posts'][0]['id']
                    blog_slug = data['posts'][0].get('slug', '')
                    
                    if blog_id:
                        result = self.test_endpoint(f"/api/v1/blog/posts/id/{blog_id}")
                        self._print_result(result)
                    
                    if blog_slug:
                        result = self.test_endpoint(f"/api/v1/blog/posts/{blog_slug}")
                        self._print_result(result)
        except:
            print(f"{Fore.YELLOW}⚠️  无博客数据，跳过单篇博客测试")
    
    def _test_ideas_apis(self):
        """测试Ideas API组"""
        print(f"\n{Fore.YELLOW}💡 Ideas API组测试")
        print("-" * 40)
        
        # 测试创意列表
        result = self.test_endpoint("/api/v1/ideas/")
        self._print_result(result)
        
        # 测试分类和标签
        endpoints = [
            "/api/v1/ideas/categories",
            "/api/v1/ideas/tags"
        ]
        
        for endpoint in endpoints:
            result = self.test_endpoint(endpoint)
            self._print_result(result)
        
        # 测试搜索
        result = self.test_endpoint("/api/v1/ideas/search", params={"query": "AI"})
        self._print_result(result)
        
        # 测试单个创意（如果有数据的话）
        try:
            response = self.session.get(f"{self.base_url}/api/v1/ideas/")
            if response.status_code == 200:
                data = response.json()
                if data.get('ideas') and len(data['ideas']) > 0:
                    idea_id = data['ideas'][0]['id']
                    result = self.test_endpoint(f"/api/v1/ideas/{idea_id}")
                    self._print_result(result)
        except:
            print(f"{Fore.YELLOW}⚠️  无创意数据，跳过单个创意测试")
    
    def _print_result(self, result: TestResult):
        """打印单个测试结果"""
        status_color = Fore.GREEN if result.success else Fore.RED
        status_symbol = "✅" if result.success else "❌"
        
        # 数据状态
        data_status = ""
        if result.success:
            if result.has_data:
                data_status = f"{Fore.GREEN}[有数据]"
            else:
                data_status = f"{Fore.YELLOW}[无数据]"
        
        print(f"{status_symbol} {result.method} {result.endpoint}")
        print(f"   状态码: {status_color}{result.status_code}{Style.RESET_ALL} | "
              f"响应时间: {result.response_time:.3f}s | "
              f"数据大小: {result.data_size}B {data_status}")
        
        if result.error_message:
            print(f"   {Fore.RED}错误: {result.error_message}")
    
    def _print_summary(self):
        """打印测试摘要"""
        print("\n" + "=" * 80)
        print(f"{Fore.CYAN}📊 测试结果摘要")
        print("=" * 80)
        
        total_tests = len(self.results)
        successful_tests = sum(1 for r in self.results if r.success)
        failed_tests = total_tests - successful_tests
        
        tests_with_data = sum(1 for r in self.results if r.success and r.has_data)
        tests_without_data = sum(1 for r in self.results if r.success and not r.has_data)
        
        avg_response_time = sum(r.response_time for r in self.results) / total_tests if total_tests > 0 else 0
        
        print(f"总测试数: {total_tests}")
        print(f"{Fore.GREEN}成功: {successful_tests} ({successful_tests/total_tests*100:.1f}%)")
        print(f"{Fore.RED}失败: {failed_tests} ({failed_tests/total_tests*100:.1f}%)")
        print(f"{Fore.GREEN}有数据: {tests_with_data}")
        print(f"{Fore.YELLOW}无数据: {tests_without_data}")
        print(f"平均响应时间: {avg_response_time:.3f}s")
        
        # 按API组分组统计
        print(f"\n{Fore.CYAN}📈 分组统计:")
        api_groups = {}
        for result in self.results:
            group = result.endpoint.split('/')[3] if len(result.endpoint.split('/')) > 3 else 'unknown'
            if group not in api_groups:
                api_groups[group] = {'total': 0, 'success': 0, 'with_data': 0}
            api_groups[group]['total'] += 1
            if result.success:
                api_groups[group]['success'] += 1
                if result.has_data:
                    api_groups[group]['with_data'] += 1
        
        for group, stats in api_groups.items():
            success_rate = stats['success'] / stats['total'] * 100
            data_rate = stats['with_data'] / stats['success'] * 100 if stats['success'] > 0 else 0
            print(f"  {group.upper()}: {stats['success']}/{stats['total']} "
                  f"({success_rate:.1f}% 成功, {data_rate:.1f}% 有数据)")
        
        # 失败的接口列表
        failed_endpoints = [r for r in self.results if not r.success]
        if failed_endpoints:
            print(f"\n{Fore.RED}❌ 失败的接口:")
            for result in failed_endpoints:
                print(f"  {result.method} {result.endpoint} - {result.error_message[:50]}")
        
        # 无数据的接口列表
        no_data_endpoints = [r for r in self.results if r.success and not r.has_data]
        if no_data_endpoints:
            print(f"\n{Fore.YELLOW}⚠️  无数据的接口:")
            for result in no_data_endpoints:
                print(f"  {result.method} {result.endpoint}")
    
    def save_results_to_json(self, filename: str = "api_test_results.json"):
        """保存测试结果到JSON文件"""
        results_data = []
        for result in self.results:
            results_data.append({
                'endpoint': result.endpoint,
                'method': result.method,
                'status_code': result.status_code,
                'response_time': result.response_time,
                'success': result.success,
                'has_data': result.has_data,
                'data_size': result.data_size,
                'error_message': result.error_message,
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S')
            })
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(results_data, f, indent=2, ensure_ascii=False)
        
        print(f"\n{Fore.GREEN}💾 测试结果已保存到: {filename}")

def main():
    """主函数"""
    import argparse
    
    parser = argparse.ArgumentParser(description='API接口测试脚本')
    parser.add_argument('--url', default='http://localhost:8888', 
                       help='API基础URL (默认: http://localhost:8888)')
    parser.add_argument('--save', action='store_true', 
                       help='保存测试结果到JSON文件')
    parser.add_argument('--quiet', action='store_true', 
                       help='静默模式，只显示摘要')
    
    args = parser.parse_args()
    
    tester = APITester(args.url)
    
    try:
        if not args.quiet:
            tester.run_all_tests()
        else:
            # 静默模式下只运行测试不打印详细结果
            print(f"{Fore.CYAN}🔍 静默模式测试中...")
            endpoints_to_test = [
                # Resume APIs
                "/api/v1/resume/", "/api/v1/resume/personal", 
                "/api/v1/resume/education", "/api/v1/resume/experience",
                "/api/v1/resume/research", "/api/v1/resume/publications",
                "/api/v1/resume/awards", "/api/v1/resume/recent",
                
                # Projects APIs  
                "/api/v1/projects/", "/api/v1/projects/categories",
                "/api/v1/projects/tags", "/api/v1/projects/graph",
                
                # Plans APIs
                "/api/v1/plans/annual", "/api/v1/plans/annual/current",
                "/api/v1/plans/projects",
                
                # Blog APIs
                "/api/v1/blog/posts", "/api/v1/blog/categories", 
                "/api/v1/blog/tags",
                
                # Ideas APIs
                "/api/v1/ideas/", "/api/v1/ideas/categories", 
                "/api/v1/ideas/tags"
            ]
            
            for endpoint in endpoints_to_test:
                tester.test_endpoint(endpoint)
            
            tester._print_summary()
        
        if args.save:
            tester.save_results_to_json()
            
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}⚠️  测试被用户中断")
        sys.exit(1)
    except Exception as e:
        print(f"\n{Fore.RED}❌ 测试过程中发生错误: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()