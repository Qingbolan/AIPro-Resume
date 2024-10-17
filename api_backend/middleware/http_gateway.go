package middleware

import (
	"context"
	"log"

	all_apis "api_backend/kitex_gen/all_api/allapisservice"
	"api_backend/kitex_gen/all_api"
	"github.com/gin-gonic/gin"
	"github.com/cloudwego/kitex/client"
	"time"
	"github.com/gin-contrib/cors"
)

type HTTPGateway struct {
	Client all_apis.Client
}

func NewHTTPGateway() *HTTPGateway {
	client, err := all_apis.NewClient(
		"AllAPIsService",
		client.WithHostPorts("127.0.0.1:8001"), // Kitex 服务地址
		client.WithConnectTimeout(300*time.Millisecond),
	)
	if err != nil {
		log.Fatalf("Failed to create Kitex client: %v", err)
	}
	return &HTTPGateway{
		Client: client,
	}
}

func (g *HTTPGateway) SetupRouter() *gin.Engine {
	router := gin.Default()

	// 设置 CORS 中间件
	config := cors.Config{
		AllowOrigins:     []string{"*"}, // 根据前端地址调整
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	router.Use(cors.New(config))

	// sendMessage API
	router.POST("/api/sendMessage", g.handleSendMessage)

	// verifyEmail API
	router.POST("/api/verifyEmail", g.handleVerifyEmail)

	// fetchResumeData API
	router.GET("/api/fetchResumeData", g.handleFetchResumeData)

	// fetchProjects API
	router.GET("/api/fetchProjects", g.handleFetchProjects)

	// fetchCategories API
	router.GET("/api/fetchCategories", g.handleFetchCategories)

	// fetchNews API
	router.GET("/api/fetchNews", g.handleFetchNews)

	// getRecentMessages API
	router.GET("/api/getRecentMessages", g.handleGetRecentMessages)

	// getRecentGoal API
	router.GET("/api/getRecentGoal", g.handleGetRecentGoal)

	// getAIResponse API
	router.POST("/api/getAIResponse", g.handleGetAIResponse)

	return router
}

// 以下各处理函数保持不变

// 处理 sendMessage API
func (g *HTTPGateway) handleSendMessage(c *gin.Context) {
	var req all_api.SendMessageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	resp, err := g.Client.SendMessage(context.Background(), &req)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}

// 处理 verifyEmail API
func (g *HTTPGateway) handleVerifyEmail(c *gin.Context) {
	var req all_api.VerifyEmailRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	resp, err := g.Client.VerifyEmail(context.Background(), &req)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}

// 处理 fetchResumeData API
func (g *HTTPGateway) handleFetchResumeData(c *gin.Context) {
	language := c.Query("language")
	if language == "" {
		language = "en"
	}
	resp, err := g.Client.FetchResumeData(context.Background(), language)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}

// 处理 fetchProjects API
func (g *HTTPGateway) handleFetchProjects(c *gin.Context) {
	language := c.Query("language")
	if language == "" {
		language = "en"
	}
	resp, err := g.Client.FetchProjects(context.Background(), language)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}

// 处理 fetchCategories API
func (g *HTTPGateway) handleFetchCategories(c *gin.Context) {
	language := c.Query("language")
	if language == "" {
		language = "en"
	}
	resp, err := g.Client.FetchCategories(context.Background(), language)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}

// 处理 fetchNews API
func (g *HTTPGateway) handleFetchNews(c *gin.Context) {
	language := c.Query("language")
	if language == "" {
		language = "en"
	}
	resp, err := g.Client.FetchNews(context.Background(), language)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}

// 处理 getRecentMessages API
func (g *HTTPGateway) handleGetRecentMessages(c *gin.Context) {
	language := c.Query("language")
	if language == "" {
		language = "en"
	}
	resp, err := g.Client.GetRecentMessages(context.Background(), language)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}

// 处理 getRecentGoal API
func (g *HTTPGateway) handleGetRecentGoal(c *gin.Context) {
	language := c.Query("language")
	if language == "" {
		language = "en"
	}
	resp, err := g.Client.GetRecentGoal(context.Background(), language)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}

// 处理 getAIResponse API
func (g *HTTPGateway) handleGetAIResponse(c *gin.Context) {
	var req struct {
		Message  string `json:"message" binding:"required"`
		Language string `json:"language" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	resp, err := g.Client.GetAIResponse(context.Background(), req.Message, req.Language)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, resp)
}