package resume

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetWorkExperienceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get work experience list
func NewGetWorkExperienceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetWorkExperienceLogic {
	return &GetWorkExperienceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetWorkExperienceLogic) GetWorkExperience(req *types.ResumeRequest) (resp []types.WorkExperience, err error) {
	// todo: add your logic here and delete this line

	return
}
