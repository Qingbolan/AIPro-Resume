package blog

import (
	"context"
	"fmt"
	"sort"

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

	// Sort blog posts by series order
	posts := series.Edges.BlogPosts
	sort.Slice(posts, func(i, j int) bool {
		orderI := posts[i].SeriesOrder
		orderJ := posts[j].SeriesOrder
		if orderI == 0 && orderJ == 0 {
			return posts[i].PublishedAt.Before(posts[j].PublishedAt)
		}
		if orderI == 0 {
			return false
		}
		if orderJ == 0 {
			return true
		}
		return orderI < orderJ
	})

	var episodes []types.SeriesEpisode
	var totalDurationMinutes int
	completedCount := 0

	for i, post := range posts {
		// Calculate duration from reading time
		var duration string
		if post.ReadingTimeMinutes > 0 {
			duration = fmt.Sprintf("%d min", post.ReadingTimeMinutes)
			totalDurationMinutes += post.ReadingTimeMinutes
		}

		// TODO: In a real application, you'd track completion per user
		// For now, we'll mark as completed if it's not the latest episode
		isCompleted := i < len(posts)-1
		if isCompleted {
			completedCount++
		}

		// Use series_order if available, otherwise use index
		episodeOrder := post.SeriesOrder
		if episodeOrder == 0 {
			episodeOrder = i + 1
		}

		episodes = append(episodes, types.SeriesEpisode{
			ID:        post.ID.String(),
			Title:     post.Title,
			Duration:  duration,
			Completed: isCompleted,
			Current:   i == len(posts)-1, // Latest episode as current
			Order:     episodeOrder,
		})
	}

	// Calculate total duration
	var totalDuration string
	if totalDurationMinutes > 0 {
		hours := totalDurationMinutes / 60
		minutes := totalDurationMinutes % 60
		if hours > 0 {
			totalDuration = fmt.Sprintf("%dh %dm", hours, minutes)
		} else {
			totalDuration = fmt.Sprintf("%dm", minutes)
		}
	}

	return &types.BlogSeries{
		ID:             series.ID.String(),
		Title:          series.Title,
		Description:    series.Description,
		ThumbnailURL:   series.ThumbnailURL,
		Episodes:       episodes,
		TotalDuration:  totalDuration,
		CompletedCount: completedCount,
		CreatedAt:      series.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt:      series.UpdatedAt.Format("2006-01-02 15:04:05"),
	}, nil
}
