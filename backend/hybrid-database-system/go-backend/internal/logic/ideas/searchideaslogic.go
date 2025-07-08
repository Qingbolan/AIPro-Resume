package ideas

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type SearchIdeasLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Search ideas with filters
func NewSearchIdeasLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SearchIdeasLogic {
	return &SearchIdeasLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SearchIdeasLogic) SearchIdeas(req *types.IdeaSearchRequest) (resp *types.IdeaListResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
