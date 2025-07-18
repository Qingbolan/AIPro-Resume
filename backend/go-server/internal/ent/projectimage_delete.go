// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"silan-backend/internal/ent/predicate"
	"silan-backend/internal/ent/projectimage"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// ProjectImageDelete is the builder for deleting a ProjectImage entity.
type ProjectImageDelete struct {
	config
	hooks    []Hook
	mutation *ProjectImageMutation
}

// Where appends a list predicates to the ProjectImageDelete builder.
func (pid *ProjectImageDelete) Where(ps ...predicate.ProjectImage) *ProjectImageDelete {
	pid.mutation.Where(ps...)
	return pid
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (pid *ProjectImageDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, pid.sqlExec, pid.mutation, pid.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (pid *ProjectImageDelete) ExecX(ctx context.Context) int {
	n, err := pid.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (pid *ProjectImageDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(projectimage.Table, sqlgraph.NewFieldSpec(projectimage.FieldID, field.TypeUUID))
	if ps := pid.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, pid.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	pid.mutation.done = true
	return affected, err
}

// ProjectImageDeleteOne is the builder for deleting a single ProjectImage entity.
type ProjectImageDeleteOne struct {
	pid *ProjectImageDelete
}

// Where appends a list predicates to the ProjectImageDelete builder.
func (pido *ProjectImageDeleteOne) Where(ps ...predicate.ProjectImage) *ProjectImageDeleteOne {
	pido.pid.mutation.Where(ps...)
	return pido
}

// Exec executes the deletion query.
func (pido *ProjectImageDeleteOne) Exec(ctx context.Context) error {
	n, err := pido.pid.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{projectimage.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (pido *ProjectImageDeleteOne) ExecX(ctx context.Context) {
	if err := pido.Exec(ctx); err != nil {
		panic(err)
	}
}
