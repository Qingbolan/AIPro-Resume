package ideas

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetIdeaLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get single idea by ID
func NewGetIdeaLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetIdeaLogic {
	return &GetIdeaLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetIdeaLogic) GetIdea(req *types.IdeaRequest) (resp *types.IdeaData, err error) {
	// todo: add your logic here and delete this line

	return
}
