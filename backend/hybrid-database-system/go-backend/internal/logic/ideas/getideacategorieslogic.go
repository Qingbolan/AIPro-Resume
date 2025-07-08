package ideas

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetIdeaCategoriesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get idea categories
func NewGetIdeaCategoriesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetIdeaCategoriesLogic {
	return &GetIdeaCategoriesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetIdeaCategoriesLogic) GetIdeaCategories(req *types.IdeaCategoriesRequest) (resp []string, err error) {
	// todo: add your logic here and delete this line

	return
}
