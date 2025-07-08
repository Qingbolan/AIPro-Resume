package svc

import (
	"github.com/zeromicro/go-zero/rest"
	"silan-backend/internal/config"
	"silan-backend/internal/middleware"
)

type ServiceContext struct {
	Config config.Config
	Cors   rest.Middleware
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config: c,
		Cors:   middleware.NewCorsMiddleware().Handle,
	}
}
