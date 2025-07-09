package blog

import (
	"context"

	"silan-backend/internal/ent/blogseries"
	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/google/uuid"
	"github.com/zeromicro/go-zero/core/logx"
)

type GetBlogSeriesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get blog series data
func NewGetBlogSeriesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetBlogSeriesLogic {
	return &GetBlogSeriesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetBlogSeriesLogic) GetBlogSeries(req *types.BlogSeriesRequest) (resp *types.BlogSeries, err error) {
	seriesUUID, err := uuid.Parse(req.SeriesID)
	if err != nil {
		return nil, err
	}
	
	series, err := l.svcCtx.DB.BlogSeries.Query().
		Where(blogseries.ID(seriesUUID)).
		WithBlogPosts().
		First(l.ctx)
	if err != nil {
		return nil, err
	}

	var episodes []types.SeriesEpisode
	for i, post := range series.Edges.BlogPosts {
		episodes = append(episodes, types.SeriesEpisode{
			ID:        post.ID.String(),
			Title:     post.Title,
			Completed: false, // This would need to be tracked separately
			Current:   i == 0, // First episode as current for now
			Order:     i + 1,
		})
	}

	return &types.BlogSeries{
		ID:             series.ID.String(),
		Title:          series.Title,
		Description:    series.Description,
		ThumbnailURL:   series.FeaturedImageURL,
		Episodes:       episodes,
		CompletedCount: 0, // This would need to be calculated
		CreatedAt:      series.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt:      series.UpdatedAt.Format("2006-01-02 15:04:05"),
	}, nil
}
