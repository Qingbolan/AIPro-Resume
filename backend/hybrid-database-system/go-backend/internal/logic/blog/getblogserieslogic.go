package blog

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetBlogSeriesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get blog series data
func NewGetBlogSeriesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetBlogSeriesLogic {
	return &GetBlogSeriesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetBlogSeriesLogic) GetBlogSeries(req *types.BlogSeriesRequest) (resp *types.BlogSeries, err error) {
	// todo: add your logic here and delete this line

	return
}
