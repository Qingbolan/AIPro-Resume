package blog

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetBlogPostLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get single blog post by slug
func NewGetBlogPostLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetBlogPostLogic {
	return &GetBlogPostLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetBlogPostLogic) GetBlogPost(req *types.BlogRequest) (resp *types.BlogData, err error) {
	// todo: add your logic here and delete this line

	return
}
