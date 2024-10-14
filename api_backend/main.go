package main

import (
	"log"
	"api_backend/middleware"
	service "api_backend/services"
	"sync"
)

func main() {
	// 使用 WaitGroup 等待所有服务启动
	var wg sync.WaitGroup
	wg.Add(2)

	// 启动 Kitex 服务
	go func() {
		defer wg.Done()
		log.Println("启动 Kitex 服务...")
		service.StartKitexServer()
	}()

	// 启动 HTTP 网关
	go func() {
		defer wg.Done()
		log.Println("启动 HTTP 网关...")
		gateway := middleware.NewHTTPGateway()
		router := gateway.SetupRouter()
		if err := router.Run(":8080"); err != nil {
			log.Fatalf("HTTP 网关启动失败: %v", err)
		}
	}()

	wg.Wait()
}