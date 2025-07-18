// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"silan-backend/internal/ent/predicate"
	"silan-backend/internal/ent/researchprojectdetail"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// ResearchProjectDetailDelete is the builder for deleting a ResearchProjectDetail entity.
type ResearchProjectDetailDelete struct {
	config
	hooks    []Hook
	mutation *ResearchProjectDetailMutation
}

// Where appends a list predicates to the ResearchProjectDetailDelete builder.
func (rpdd *ResearchProjectDetailDelete) Where(ps ...predicate.ResearchProjectDetail) *ResearchProjectDetailDelete {
	rpdd.mutation.Where(ps...)
	return rpdd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (rpdd *ResearchProjectDetailDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, rpdd.sqlExec, rpdd.mutation, rpdd.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (rpdd *ResearchProjectDetailDelete) ExecX(ctx context.Context) int {
	n, err := rpdd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (rpdd *ResearchProjectDetailDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(researchprojectdetail.Table, sqlgraph.NewFieldSpec(researchprojectdetail.FieldID, field.TypeUUID))
	if ps := rpdd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, rpdd.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	rpdd.mutation.done = true
	return affected, err
}

// ResearchProjectDetailDeleteOne is the builder for deleting a single ResearchProjectDetail entity.
type ResearchProjectDetailDeleteOne struct {
	rpdd *ResearchProjectDetailDelete
}

// Where appends a list predicates to the ResearchProjectDetailDelete builder.
func (rpddo *ResearchProjectDetailDeleteOne) Where(ps ...predicate.ResearchProjectDetail) *ResearchProjectDetailDeleteOne {
	rpddo.rpdd.mutation.Where(ps...)
	return rpddo
}

// Exec executes the deletion query.
func (rpddo *ResearchProjectDetailDeleteOne) Exec(ctx context.Context) error {
	n, err := rpddo.rpdd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{researchprojectdetail.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (rpddo *ResearchProjectDetailDeleteOne) ExecX(ctx context.Context) {
	if err := rpddo.Exec(ctx); err != nil {
		panic(err)
	}
}
