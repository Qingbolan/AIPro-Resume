package blog

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetBlogTagsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get blog tags
func NewGetBlogTagsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetBlogTagsLogic {
	return &GetBlogTagsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetBlogTagsLogic) GetBlogTags(req *types.BlogTagsRequest) (resp []types.BlogTag, err error) {
	// todo: add your logic here and delete this line

	return
}
