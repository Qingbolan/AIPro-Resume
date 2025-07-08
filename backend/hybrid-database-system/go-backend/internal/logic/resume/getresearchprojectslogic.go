package resume

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetResearchProjectsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get research projects list
func NewGetResearchProjectsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetResearchProjectsLogic {
	return &GetResearchProjectsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetResearchProjectsLogic) GetResearchProjects(req *types.ResumeRequest) (resp []types.ResearchProject, err error) {
	// todo: add your logic here and delete this line

	return
}
