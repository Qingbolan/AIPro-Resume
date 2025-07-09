package projects

import (
	"context"
	"fmt"

	"silan-backend/internal/ent/project"
	"silan-backend/internal/svc"
	"silan-backend/internal/types"

	"github.com/google/uuid"
	"github.com/zeromicro/go-zero/core/logx"
)

type GetProjectDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// Get detailed project information
func NewGetProjectDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetProjectDetailLogic {
	return &GetProjectDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetProjectDetailLogic) GetProjectDetail(req *types.ProjectDetailRequest) (resp *types.ProjectDetail, err error) {
	projectUUID, err := uuid.Parse(req.ID)
	if err != nil {
		return nil, err
	}

	proj, err := l.svcCtx.DB.Project.Query().
		Where(project.ID(projectUUID)).
		WithDetail().
		First(l.ctx)
	if err != nil {
		return nil, err
	}

	if proj.Edges.Detail == nil {
		return nil, fmt.Errorf("project detail not found")
	}

	detail := proj.Edges.Detail

	// Parse timeline
	var timeline types.ProjectTimeline
	if !proj.StartDate.IsZero() {
		timeline.Start = proj.StartDate.Format("2006-01-02")
	}
	if !proj.EndDate.IsZero() {
		timeline.End = proj.EndDate.Format("2006-01-02")
	}
	// Handle duration field (now non-nullable)
	timeline.Duration = detail.ProjectDuration

	// Parse metrics
	var metrics types.ProjectMetrics
	if detail.PerformanceMetrics != nil {
		perfMetrics := detail.PerformanceMetrics
		if loc, ok := perfMetrics["lines_of_code"].(float64); ok {
			metrics.LinesOfCode = int(loc)
		}
		if commits, ok := perfMetrics["commits"].(float64); ok {
			metrics.Commits = int(commits)
		}
		if stars, ok := perfMetrics["stars"].(float64); ok {
			metrics.Stars = int(stars)
		}
		if downloads, ok := perfMetrics["downloads"].(float64); ok {
			metrics.Downloads = int(downloads)
		}
	}

	return &types.ProjectDetail{
		ID:                  detail.ID.String(),
		ProjectID:           proj.ID.String(), // Use project ID from parent
		DetailedDescription: detail.FullDescription,
		Timeline:            timeline,
		Metrics:             metrics,
		RelatedBlogs:        []types.ProjectBlogRef{}, // This would need to be implemented
		CreatedAt:           detail.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt:           detail.UpdatedAt.Format("2006-01-02 15:04:05"),
	}, nil
}
