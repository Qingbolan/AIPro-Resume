package blog

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetBlogCategoriesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get blog categories
func NewGetBlogCategoriesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetBlogCategoriesLogic {
	return &GetBlogCategoriesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetBlogCategoriesLogic) GetBlogCategories(req *types.BlogCategoriesRequest) (resp []types.BlogCategory, err error) {
	// todo: add your logic here and delete this line

	return
}
