package resume

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPersonalInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get personal information
func NewGetPersonalInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPersonalInfoLogic {
	return &GetPersonalInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPersonalInfoLogic) GetPersonalInfo(req *types.PersonalInfoRequest) (resp *types.PersonalInfo, err error) {
	// todo: add your logic here and delete this line

	return
}
