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
		WithDetails().
		First(l.ctx)
	if err != nil {
		return nil, err
	}

	if proj.Edges.Details == nil {
		return nil, fmt.Errorf("project detail not found")
	}

	detail := proj.Edges.Details

	// Parse timeline
	var timeline types.ProjectTimeline
	if !proj.StartDate.IsZero() {
		timeline.Start = proj.StartDate.Format("2006-01-02")
	}
	if !proj.EndDate.IsZero() {
		timeline.End = proj.EndDate.Format("2006-01-02")
	}
	// Set duration based on start and end dates
	timeline.Duration = ""

	// Parse metrics - these would need to be calculated or stored separately
	var metrics types.ProjectMetrics
	// Initialize with default values since these fields don't exist in the schema
	metrics.LinesOfCode = 0
	metrics.Commits = 0
	metrics.Stars = 0
	metrics.Downloads = 0

	return &types.ProjectDetail{
		ID:                  detail.ID.String(),
		ProjectID:           proj.ID.String(), // Use project ID from parent
		DetailedDescription: detail.DetailedDescription,
		Timeline:            timeline,
		Metrics:             metrics,
		RelatedBlogs:        []types.ProjectBlogRef{}, // This would need to be implemented
		CreatedAt:           detail.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt:           detail.UpdatedAt.Format("2006-01-02 15:04:05"),
	}, nil
}
