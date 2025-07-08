package projects

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetProjectCategoriesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get project categories
func NewGetProjectCategoriesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetProjectCategoriesLogic {
	return &GetProjectCategoriesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetProjectCategoriesLogic) GetProjectCategories(req *types.ResumeRequest) (resp []string, err error) {
	// todo: add your logic here and delete this line

	return
}
