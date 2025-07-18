// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/predicate"
	"silan-backend/internal/ent/researchproject"
	"silan-backend/internal/ent/researchprojecttranslation"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ResearchProjectTranslationUpdate is the builder for updating ResearchProjectTranslation entities.
type ResearchProjectTranslationUpdate struct {
	config
	hooks    []Hook
	mutation *ResearchProjectTranslationMutation
}

// Where appends a list predicates to the ResearchProjectTranslationUpdate builder.
func (rptu *ResearchProjectTranslationUpdate) Where(ps ...predicate.ResearchProjectTranslation) *ResearchProjectTranslationUpdate {
	rptu.mutation.Where(ps...)
	return rptu
}

// SetResearchProjectID sets the "research_project_id" field.
func (rptu *ResearchProjectTranslationUpdate) SetResearchProjectID(u uuid.UUID) *ResearchProjectTranslationUpdate {
	rptu.mutation.SetResearchProjectID(u)
	return rptu
}

// SetNillableResearchProjectID sets the "research_project_id" field if the given value is not nil.
func (rptu *ResearchProjectTranslationUpdate) SetNillableResearchProjectID(u *uuid.UUID) *ResearchProjectTranslationUpdate {
	if u != nil {
		rptu.SetResearchProjectID(*u)
	}
	return rptu
}

// SetLanguageCode sets the "language_code" field.
func (rptu *ResearchProjectTranslationUpdate) SetLanguageCode(s string) *ResearchProjectTranslationUpdate {
	rptu.mutation.SetLanguageCode(s)
	return rptu
}

// SetNillableLanguageCode sets the "language_code" field if the given value is not nil.
func (rptu *ResearchProjectTranslationUpdate) SetNillableLanguageCode(s *string) *ResearchProjectTranslationUpdate {
	if s != nil {
		rptu.SetLanguageCode(*s)
	}
	return rptu
}

// SetTitle sets the "title" field.
func (rptu *ResearchProjectTranslationUpdate) SetTitle(s string) *ResearchProjectTranslationUpdate {
	rptu.mutation.SetTitle(s)
	return rptu
}

// SetNillableTitle sets the "title" field if the given value is not nil.
func (rptu *ResearchProjectTranslationUpdate) SetNillableTitle(s *string) *ResearchProjectTranslationUpdate {
	if s != nil {
		rptu.SetTitle(*s)
	}
	return rptu
}

// SetLocation sets the "location" field.
func (rptu *ResearchProjectTranslationUpdate) SetLocation(s string) *ResearchProjectTranslationUpdate {
	rptu.mutation.SetLocation(s)
	return rptu
}

// SetNillableLocation sets the "location" field if the given value is not nil.
func (rptu *ResearchProjectTranslationUpdate) SetNillableLocation(s *string) *ResearchProjectTranslationUpdate {
	if s != nil {
		rptu.SetLocation(*s)
	}
	return rptu
}

// ClearLocation clears the value of the "location" field.
func (rptu *ResearchProjectTranslationUpdate) ClearLocation() *ResearchProjectTranslationUpdate {
	rptu.mutation.ClearLocation()
	return rptu
}

// SetResearchType sets the "research_type" field.
func (rptu *ResearchProjectTranslationUpdate) SetResearchType(s string) *ResearchProjectTranslationUpdate {
	rptu.mutation.SetResearchType(s)
	return rptu
}

// SetNillableResearchType sets the "research_type" field if the given value is not nil.
func (rptu *ResearchProjectTranslationUpdate) SetNillableResearchType(s *string) *ResearchProjectTranslationUpdate {
	if s != nil {
		rptu.SetResearchType(*s)
	}
	return rptu
}

// ClearResearchType clears the value of the "research_type" field.
func (rptu *ResearchProjectTranslationUpdate) ClearResearchType() *ResearchProjectTranslationUpdate {
	rptu.mutation.ClearResearchType()
	return rptu
}

// SetFundingSource sets the "funding_source" field.
func (rptu *ResearchProjectTranslationUpdate) SetFundingSource(s string) *ResearchProjectTranslationUpdate {
	rptu.mutation.SetFundingSource(s)
	return rptu
}

// SetNillableFundingSource sets the "funding_source" field if the given value is not nil.
func (rptu *ResearchProjectTranslationUpdate) SetNillableFundingSource(s *string) *ResearchProjectTranslationUpdate {
	if s != nil {
		rptu.SetFundingSource(*s)
	}
	return rptu
}

// ClearFundingSource clears the value of the "funding_source" field.
func (rptu *ResearchProjectTranslationUpdate) ClearFundingSource() *ResearchProjectTranslationUpdate {
	rptu.mutation.ClearFundingSource()
	return rptu
}

// SetResearchProject sets the "research_project" edge to the ResearchProject entity.
func (rptu *ResearchProjectTranslationUpdate) SetResearchProject(r *ResearchProject) *ResearchProjectTranslationUpdate {
	return rptu.SetResearchProjectID(r.ID)
}

// SetLanguageID sets the "language" edge to the Language entity by ID.
func (rptu *ResearchProjectTranslationUpdate) SetLanguageID(id string) *ResearchProjectTranslationUpdate {
	rptu.mutation.SetLanguageID(id)
	return rptu
}

// SetLanguage sets the "language" edge to the Language entity.
func (rptu *ResearchProjectTranslationUpdate) SetLanguage(l *Language) *ResearchProjectTranslationUpdate {
	return rptu.SetLanguageID(l.ID)
}

// Mutation returns the ResearchProjectTranslationMutation object of the builder.
func (rptu *ResearchProjectTranslationUpdate) Mutation() *ResearchProjectTranslationMutation {
	return rptu.mutation
}

// ClearResearchProject clears the "research_project" edge to the ResearchProject entity.
func (rptu *ResearchProjectTranslationUpdate) ClearResearchProject() *ResearchProjectTranslationUpdate {
	rptu.mutation.ClearResearchProject()
	return rptu
}

// ClearLanguage clears the "language" edge to the Language entity.
func (rptu *ResearchProjectTranslationUpdate) ClearLanguage() *ResearchProjectTranslationUpdate {
	rptu.mutation.ClearLanguage()
	return rptu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (rptu *ResearchProjectTranslationUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, rptu.sqlSave, rptu.mutation, rptu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (rptu *ResearchProjectTranslationUpdate) SaveX(ctx context.Context) int {
	affected, err := rptu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (rptu *ResearchProjectTranslationUpdate) Exec(ctx context.Context) error {
	_, err := rptu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rptu *ResearchProjectTranslationUpdate) ExecX(ctx context.Context) {
	if err := rptu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rptu *ResearchProjectTranslationUpdate) check() error {
	if v, ok := rptu.mutation.LanguageCode(); ok {
		if err := researchprojecttranslation.LanguageCodeValidator(v); err != nil {
			return &ValidationError{Name: "language_code", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.language_code": %w`, err)}
		}
	}
	if v, ok := rptu.mutation.Title(); ok {
		if err := researchprojecttranslation.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.title": %w`, err)}
		}
	}
	if v, ok := rptu.mutation.Location(); ok {
		if err := researchprojecttranslation.LocationValidator(v); err != nil {
			return &ValidationError{Name: "location", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.location": %w`, err)}
		}
	}
	if v, ok := rptu.mutation.ResearchType(); ok {
		if err := researchprojecttranslation.ResearchTypeValidator(v); err != nil {
			return &ValidationError{Name: "research_type", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.research_type": %w`, err)}
		}
	}
	if v, ok := rptu.mutation.FundingSource(); ok {
		if err := researchprojecttranslation.FundingSourceValidator(v); err != nil {
			return &ValidationError{Name: "funding_source", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.funding_source": %w`, err)}
		}
	}
	if rptu.mutation.ResearchProjectCleared() && len(rptu.mutation.ResearchProjectIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "ResearchProjectTranslation.research_project"`)
	}
	if rptu.mutation.LanguageCleared() && len(rptu.mutation.LanguageIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "ResearchProjectTranslation.language"`)
	}
	return nil
}

func (rptu *ResearchProjectTranslationUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := rptu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(researchprojecttranslation.Table, researchprojecttranslation.Columns, sqlgraph.NewFieldSpec(researchprojecttranslation.FieldID, field.TypeUUID))
	if ps := rptu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := rptu.mutation.Title(); ok {
		_spec.SetField(researchprojecttranslation.FieldTitle, field.TypeString, value)
	}
	if value, ok := rptu.mutation.Location(); ok {
		_spec.SetField(researchprojecttranslation.FieldLocation, field.TypeString, value)
	}
	if rptu.mutation.LocationCleared() {
		_spec.ClearField(researchprojecttranslation.FieldLocation, field.TypeString)
	}
	if value, ok := rptu.mutation.ResearchType(); ok {
		_spec.SetField(researchprojecttranslation.FieldResearchType, field.TypeString, value)
	}
	if rptu.mutation.ResearchTypeCleared() {
		_spec.ClearField(researchprojecttranslation.FieldResearchType, field.TypeString)
	}
	if value, ok := rptu.mutation.FundingSource(); ok {
		_spec.SetField(researchprojecttranslation.FieldFundingSource, field.TypeString, value)
	}
	if rptu.mutation.FundingSourceCleared() {
		_spec.ClearField(researchprojecttranslation.FieldFundingSource, field.TypeString)
	}
	if rptu.mutation.ResearchProjectCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojecttranslation.ResearchProjectTable,
			Columns: []string{researchprojecttranslation.ResearchProjectColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(researchproject.FieldID, field.TypeUUID),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rptu.mutation.ResearchProjectIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojecttranslation.ResearchProjectTable,
			Columns: []string{researchprojecttranslation.ResearchProjectColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(researchproject.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rptu.mutation.LanguageCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojecttranslation.LanguageTable,
			Columns: []string{researchprojecttranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rptu.mutation.LanguageIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojecttranslation.LanguageTable,
			Columns: []string{researchprojecttranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, rptu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{researchprojecttranslation.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	rptu.mutation.done = true
	return n, nil
}

// ResearchProjectTranslationUpdateOne is the builder for updating a single ResearchProjectTranslation entity.
type ResearchProjectTranslationUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *ResearchProjectTranslationMutation
}

// SetResearchProjectID sets the "research_project_id" field.
func (rptuo *ResearchProjectTranslationUpdateOne) SetResearchProjectID(u uuid.UUID) *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.SetResearchProjectID(u)
	return rptuo
}

// SetNillableResearchProjectID sets the "research_project_id" field if the given value is not nil.
func (rptuo *ResearchProjectTranslationUpdateOne) SetNillableResearchProjectID(u *uuid.UUID) *ResearchProjectTranslationUpdateOne {
	if u != nil {
		rptuo.SetResearchProjectID(*u)
	}
	return rptuo
}

// SetLanguageCode sets the "language_code" field.
func (rptuo *ResearchProjectTranslationUpdateOne) SetLanguageCode(s string) *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.SetLanguageCode(s)
	return rptuo
}

// SetNillableLanguageCode sets the "language_code" field if the given value is not nil.
func (rptuo *ResearchProjectTranslationUpdateOne) SetNillableLanguageCode(s *string) *ResearchProjectTranslationUpdateOne {
	if s != nil {
		rptuo.SetLanguageCode(*s)
	}
	return rptuo
}

// SetTitle sets the "title" field.
func (rptuo *ResearchProjectTranslationUpdateOne) SetTitle(s string) *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.SetTitle(s)
	return rptuo
}

// SetNillableTitle sets the "title" field if the given value is not nil.
func (rptuo *ResearchProjectTranslationUpdateOne) SetNillableTitle(s *string) *ResearchProjectTranslationUpdateOne {
	if s != nil {
		rptuo.SetTitle(*s)
	}
	return rptuo
}

// SetLocation sets the "location" field.
func (rptuo *ResearchProjectTranslationUpdateOne) SetLocation(s string) *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.SetLocation(s)
	return rptuo
}

// SetNillableLocation sets the "location" field if the given value is not nil.
func (rptuo *ResearchProjectTranslationUpdateOne) SetNillableLocation(s *string) *ResearchProjectTranslationUpdateOne {
	if s != nil {
		rptuo.SetLocation(*s)
	}
	return rptuo
}

// ClearLocation clears the value of the "location" field.
func (rptuo *ResearchProjectTranslationUpdateOne) ClearLocation() *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.ClearLocation()
	return rptuo
}

// SetResearchType sets the "research_type" field.
func (rptuo *ResearchProjectTranslationUpdateOne) SetResearchType(s string) *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.SetResearchType(s)
	return rptuo
}

// SetNillableResearchType sets the "research_type" field if the given value is not nil.
func (rptuo *ResearchProjectTranslationUpdateOne) SetNillableResearchType(s *string) *ResearchProjectTranslationUpdateOne {
	if s != nil {
		rptuo.SetResearchType(*s)
	}
	return rptuo
}

// ClearResearchType clears the value of the "research_type" field.
func (rptuo *ResearchProjectTranslationUpdateOne) ClearResearchType() *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.ClearResearchType()
	return rptuo
}

// SetFundingSource sets the "funding_source" field.
func (rptuo *ResearchProjectTranslationUpdateOne) SetFundingSource(s string) *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.SetFundingSource(s)
	return rptuo
}

// SetNillableFundingSource sets the "funding_source" field if the given value is not nil.
func (rptuo *ResearchProjectTranslationUpdateOne) SetNillableFundingSource(s *string) *ResearchProjectTranslationUpdateOne {
	if s != nil {
		rptuo.SetFundingSource(*s)
	}
	return rptuo
}

// ClearFundingSource clears the value of the "funding_source" field.
func (rptuo *ResearchProjectTranslationUpdateOne) ClearFundingSource() *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.ClearFundingSource()
	return rptuo
}

// SetResearchProject sets the "research_project" edge to the ResearchProject entity.
func (rptuo *ResearchProjectTranslationUpdateOne) SetResearchProject(r *ResearchProject) *ResearchProjectTranslationUpdateOne {
	return rptuo.SetResearchProjectID(r.ID)
}

// SetLanguageID sets the "language" edge to the Language entity by ID.
func (rptuo *ResearchProjectTranslationUpdateOne) SetLanguageID(id string) *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.SetLanguageID(id)
	return rptuo
}

// SetLanguage sets the "language" edge to the Language entity.
func (rptuo *ResearchProjectTranslationUpdateOne) SetLanguage(l *Language) *ResearchProjectTranslationUpdateOne {
	return rptuo.SetLanguageID(l.ID)
}

// Mutation returns the ResearchProjectTranslationMutation object of the builder.
func (rptuo *ResearchProjectTranslationUpdateOne) Mutation() *ResearchProjectTranslationMutation {
	return rptuo.mutation
}

// ClearResearchProject clears the "research_project" edge to the ResearchProject entity.
func (rptuo *ResearchProjectTranslationUpdateOne) ClearResearchProject() *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.ClearResearchProject()
	return rptuo
}

// ClearLanguage clears the "language" edge to the Language entity.
func (rptuo *ResearchProjectTranslationUpdateOne) ClearLanguage() *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.ClearLanguage()
	return rptuo
}

// Where appends a list predicates to the ResearchProjectTranslationUpdate builder.
func (rptuo *ResearchProjectTranslationUpdateOne) Where(ps ...predicate.ResearchProjectTranslation) *ResearchProjectTranslationUpdateOne {
	rptuo.mutation.Where(ps...)
	return rptuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (rptuo *ResearchProjectTranslationUpdateOne) Select(field string, fields ...string) *ResearchProjectTranslationUpdateOne {
	rptuo.fields = append([]string{field}, fields...)
	return rptuo
}

// Save executes the query and returns the updated ResearchProjectTranslation entity.
func (rptuo *ResearchProjectTranslationUpdateOne) Save(ctx context.Context) (*ResearchProjectTranslation, error) {
	return withHooks(ctx, rptuo.sqlSave, rptuo.mutation, rptuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (rptuo *ResearchProjectTranslationUpdateOne) SaveX(ctx context.Context) *ResearchProjectTranslation {
	node, err := rptuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (rptuo *ResearchProjectTranslationUpdateOne) Exec(ctx context.Context) error {
	_, err := rptuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rptuo *ResearchProjectTranslationUpdateOne) ExecX(ctx context.Context) {
	if err := rptuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rptuo *ResearchProjectTranslationUpdateOne) check() error {
	if v, ok := rptuo.mutation.LanguageCode(); ok {
		if err := researchprojecttranslation.LanguageCodeValidator(v); err != nil {
			return &ValidationError{Name: "language_code", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.language_code": %w`, err)}
		}
	}
	if v, ok := rptuo.mutation.Title(); ok {
		if err := researchprojecttranslation.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.title": %w`, err)}
		}
	}
	if v, ok := rptuo.mutation.Location(); ok {
		if err := researchprojecttranslation.LocationValidator(v); err != nil {
			return &ValidationError{Name: "location", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.location": %w`, err)}
		}
	}
	if v, ok := rptuo.mutation.ResearchType(); ok {
		if err := researchprojecttranslation.ResearchTypeValidator(v); err != nil {
			return &ValidationError{Name: "research_type", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.research_type": %w`, err)}
		}
	}
	if v, ok := rptuo.mutation.FundingSource(); ok {
		if err := researchprojecttranslation.FundingSourceValidator(v); err != nil {
			return &ValidationError{Name: "funding_source", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectTranslation.funding_source": %w`, err)}
		}
	}
	if rptuo.mutation.ResearchProjectCleared() && len(rptuo.mutation.ResearchProjectIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "ResearchProjectTranslation.research_project"`)
	}
	if rptuo.mutation.LanguageCleared() && len(rptuo.mutation.LanguageIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "ResearchProjectTranslation.language"`)
	}
	return nil
}

func (rptuo *ResearchProjectTranslationUpdateOne) sqlSave(ctx context.Context) (_node *ResearchProjectTranslation, err error) {
	if err := rptuo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(researchprojecttranslation.Table, researchprojecttranslation.Columns, sqlgraph.NewFieldSpec(researchprojecttranslation.FieldID, field.TypeUUID))
	id, ok := rptuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "ResearchProjectTranslation.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := rptuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, researchprojecttranslation.FieldID)
		for _, f := range fields {
			if !researchprojecttranslation.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != researchprojecttranslation.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := rptuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := rptuo.mutation.Title(); ok {
		_spec.SetField(researchprojecttranslation.FieldTitle, field.TypeString, value)
	}
	if value, ok := rptuo.mutation.Location(); ok {
		_spec.SetField(researchprojecttranslation.FieldLocation, field.TypeString, value)
	}
	if rptuo.mutation.LocationCleared() {
		_spec.ClearField(researchprojecttranslation.FieldLocation, field.TypeString)
	}
	if value, ok := rptuo.mutation.ResearchType(); ok {
		_spec.SetField(researchprojecttranslation.FieldResearchType, field.TypeString, value)
	}
	if rptuo.mutation.ResearchTypeCleared() {
		_spec.ClearField(researchprojecttranslation.FieldResearchType, field.TypeString)
	}
	if value, ok := rptuo.mutation.FundingSource(); ok {
		_spec.SetField(researchprojecttranslation.FieldFundingSource, field.TypeString, value)
	}
	if rptuo.mutation.FundingSourceCleared() {
		_spec.ClearField(researchprojecttranslation.FieldFundingSource, field.TypeString)
	}
	if rptuo.mutation.ResearchProjectCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojecttranslation.ResearchProjectTable,
			Columns: []string{researchprojecttranslation.ResearchProjectColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(researchproject.FieldID, field.TypeUUID),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rptuo.mutation.ResearchProjectIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojecttranslation.ResearchProjectTable,
			Columns: []string{researchprojecttranslation.ResearchProjectColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(researchproject.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if rptuo.mutation.LanguageCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojecttranslation.LanguageTable,
			Columns: []string{researchprojecttranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := rptuo.mutation.LanguageIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojecttranslation.LanguageTable,
			Columns: []string{researchprojecttranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &ResearchProjectTranslation{config: rptuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, rptuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{researchprojecttranslation.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	rptuo.mutation.done = true
	return _node, nil
}
