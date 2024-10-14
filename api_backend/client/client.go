package main

import (
    "context"
    "fmt"
    "log"

    all_apis "api_backend/kitex_gen/all_api/allapisservice"
	"api_backend/kitex_gen/all_api"
    "github.com/cloudwego/kitex/client"
)

func main() {
    // 创建 Kitex 客户端
    c, err := all_apis.NewClient(
        "AllAPIsService",
        client.WithHostPorts("127.0.0.1:8001"),
    )
    if err!= nil {
        log.Fatalf("Error creating Kitex client: %v", err)
    }

    // 调用 getAIResponse API
    aiResp, err := c.GetAIResponse(context.Background(), "Hello, AI!", "zh")
    if err!= nil {
        log.Fatalf("Error calling GetAIResponse: %v", err)
    }
    fmt.Println("AI Response:", aiResp.Response)

    // 其他 API 的调用示例
    // sendMessage
    sendResp, err := c.SendMessage(context.Background(), &all_api.SendMessageRequest{
       FormData:   "Sample Data",
       FormType:   "TypeA",
       SendResume: true,
       Language:   "en",
    })
    if err!= nil {
       log.Fatalf("Error calling SendMessage: %v", err)
    }
    fmt.Println("SendMessage Response:", sendResp.Message)
}