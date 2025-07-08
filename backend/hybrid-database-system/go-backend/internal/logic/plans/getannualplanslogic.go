package plans

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAnnualPlansLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get annual plans list
func NewGetAnnualPlansLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAnnualPlansLogic {
	return &GetAnnualPlansLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAnnualPlansLogic) GetAnnualPlans(req *types.AnnualPlanListRequest) (resp []types.AnnualPlan, err error) {
	// todo: add your logic here and delete this line

	return
}
