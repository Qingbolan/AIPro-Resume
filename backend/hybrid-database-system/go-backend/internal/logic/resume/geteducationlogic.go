package resume

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetEducationLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get education list
func NewGetEducationLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetEducationLogic {
	return &GetEducationLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetEducationLogic) GetEducation(req *types.ResumeRequest) (resp []types.Education, err error) {
	// todo: add your logic here and delete this line

	return
}
