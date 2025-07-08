package ideas

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetIdeasLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get ideas list with pagination and filtering
func NewGetIdeasLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetIdeasLogic {
	return &GetIdeasLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetIdeasLogic) GetIdeas(req *types.IdeaListRequest) (resp *types.IdeaListResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
