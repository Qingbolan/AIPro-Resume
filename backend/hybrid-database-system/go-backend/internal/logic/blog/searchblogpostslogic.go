package blog

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type SearchBlogPostsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Search blog posts with filters
func NewSearchBlogPostsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SearchBlogPostsLogic {
	return &SearchBlogPostsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SearchBlogPostsLogic) SearchBlogPosts(req *types.BlogSearchRequest) (resp *types.BlogListResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
