package resume

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPublicationsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get publications list
func NewGetPublicationsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPublicationsLogic {
	return &GetPublicationsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPublicationsLogic) GetPublications(req *types.ResumeRequest) (resp []types.Publication, err error) {
	// todo: add your logic here and delete this line

	return
}
