package resume

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRecentUpdatesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get recent updates
func NewGetRecentUpdatesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRecentUpdatesLogic {
	return &GetRecentUpdatesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRecentUpdatesLogic) GetRecentUpdates(req *types.ResumeRequest) (resp []types.RecentUpdate, err error) {
	// todo: add your logic here and delete this line

	return
}
