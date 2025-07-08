package blog

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetBlogPostsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get blog posts list with pagination and filtering
func NewGetBlogPostsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetBlogPostsLogic {
	return &GetBlogPostsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetBlogPostsLogic) GetBlogPosts(req *types.BlogListRequest) (resp *types.BlogListResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
