package resume

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetResumeDataLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get complete resume data
func NewGetResumeDataLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetResumeDataLogic {
	return &GetResumeDataLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetResumeDataLogic) GetResumeData(req *types.ResumeRequest) (resp *types.ResumeData, err error) {
	// todo: add your logic here and delete this line

	return
}
