package projects

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetProjectByIdLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get single project by ID (numeric)
func NewGetProjectByIdLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetProjectByIdLogic {
	return &GetProjectByIdLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetProjectByIdLogic) GetProjectById(req *types.ProjectByIdRequest) (resp *types.Project, err error) {
	// todo: add your logic here and delete this line

	return
}
