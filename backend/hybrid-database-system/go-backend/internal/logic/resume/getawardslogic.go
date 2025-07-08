package resume

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAwardsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get awards list
func NewGetAwardsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAwardsLogic {
	return &GetAwardsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAwardsLogic) GetAwards(req *types.ResumeRequest) (resp []types.Award, err error) {
	// todo: add your logic here and delete this line

	return
}
