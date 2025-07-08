package ideas

import (
	"context"

	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetIdeaTagsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get idea tags
func NewGetIdeaTagsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetIdeaTagsLogic {
	return &GetIdeaTagsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetIdeaTagsLogic) GetIdeaTags(req *types.IdeaTagsRequest) (resp []string, err error) {
	// todo: add your logic here and delete this line

	return
}
