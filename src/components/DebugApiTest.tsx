import React, { useState } from 'react';
import { 
  debugFetchResumeData, 
  debugFetchPersonalInfo,
  testBackendConnection,
  testSpecificEndpoint 
} from '../api/debug_resumeApi';

/**
 * API调试测试组件
 * 用于诊断为什么没有向后端发送请求
 */
export const DebugApiTest: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearResults = () => {
    setResults([]);
  };

  // 1. 测试后端连接
  const testConnection = async () => {
    setLoading(true);
    addResult('🔍 开始测试后端连接...');
    
    try {
      const isConnected = await testBackendConnection();
      if (isConnected) {
        addResult('✅ 后端连接成功！');
      } else {
        addResult('❌ 后端连接失败！');
      }
    } catch (error) {
      addResult(`❌ 连接测试异常: ${error instanceof Error ? error.message : error}`);
    } finally {
      setLoading(false);
    }
  };

  // 2. 测试特定API端点
  const testEndpoint = async (endpoint: string, description: string) => {
    setLoading(true);
    addResult(`🧪 测试 ${description}...`);
    
    try {
      await testSpecificEndpoint(endpoint);
      addResult(`✅ ${description} 成功！`);
    } catch (error) {
      addResult(`❌ ${description} 失败: ${error instanceof Error ? error.message : error}`);
    } finally {
      setLoading(false);
    }
  };

  // 3. 测试Debug版本的API调用
  const testDebugResumeApi = async () => {
    setLoading(true);
    addResult('🚀 测试调试版Resume API...');
    
    try {
      const data = await debugFetchResumeData('en');
      addResult('✅ Debug Resume API调用成功！');
      addResult(`📊 返回数据: ${JSON.stringify(data).substring(0, 200)}...`);
    } catch (error) {
      addResult(`❌ Debug Resume API失败: ${error instanceof Error ? error.message : error}`);
    } finally {
      setLoading(false);
    }
  };

  // 4. 检查浏览器网络请求
  const checkNetworkTab = () => {
    addResult('📋 请检查浏览器开发者工具:');
    addResult('1. 按F12打开开发者工具');
    addResult('2. 切换到Network(网络)标签');
    addResult('3. 点击上面的测试按钮');
    addResult('4. 查看是否有HTTP请求发出');
    addResult('5. 如果没有请求，说明API函数没有被调用');
    addResult('6. 如果有请求但失败，查看错误详情');
  };

  return (
    <div className="debug-api-test p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">🔧 API调试测试工具</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 测试按钮组 */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">测试项目</h2>
          
          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            🔍 测试后端连接
          </button>
          
          <button
            onClick={() => testEndpoint('/api/v1/resume', 'Resume API')}
            disabled={loading}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            🧪 测试Resume端点
          </button>
          
          <button
            onClick={() => testEndpoint('/api/v1/projects', 'Projects API')}
            disabled={loading}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            🧪 测试Projects端点
          </button>
          
          <button
            onClick={testDebugResumeApi}
            disabled={loading}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            🚀 测试Debug Resume API
          </button>
          
          <button
            onClick={checkNetworkTab}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            📋 检查网络请求指南
          </button>
          
          <button
            onClick={clearResults}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            🗑️ 清除结果
          </button>
        </div>
        
        {/* 配置信息 */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">当前配置</h2>
          <div className="bg-gray-100 p-3 rounded text-sm">
            <p><strong>后端URL:</strong> http://localhost:8888</p>
            <p><strong>API版本:</strong> v1</p>
            <p><strong>超时时间:</strong> 10秒</p>
            <p><strong>请求头:</strong> application/json</p>
          </div>
          
          <div className="bg-yellow-100 p-3 rounded text-sm">
            <p><strong>⚠️ 可能的问题:</strong></p>
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>后端服务没有运行</li>
              <li>端口8888被占用</li>
              <li>CORS跨域配置问题</li>
              <li>防火墙阻止连接</li>
              <li>withFallback隐藏了错误</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 测试结果 */}
      <div className="results">
        <h2 className="text-lg font-semibold mb-3">测试结果</h2>
        <div className="bg-black text-green-400 p-4 rounded h-96 overflow-y-auto font-mono text-sm">
          {results.length === 0 ? (
            <p>点击上面的按钮开始测试...</p>
          ) : (
            results.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))
          )}
          {loading && (
            <div className="text-yellow-400">
              ⏳ 测试进行中...
            </div>
          )}
        </div>
      </div>
      
      {/* 快速修复建议 */}
      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">🔧 快速修复建议:</h3>
        <ol className="list-decimal ml-4 space-y-1 text-sm text-blue-700">
          <li>确保后端服务在 localhost:8888 运行</li>
          <li>检查后端是否实现了对应的API端点</li>
          <li>暂时禁用withFallback来查看真实错误</li>
          <li>检查浏览器控制台的错误信息</li>
          <li>使用curl命令测试API: <code>curl http://localhost:8888/api/v1/resume?lang=en</code></li>
        </ol>
      </div>
    </div>
  );
}; 