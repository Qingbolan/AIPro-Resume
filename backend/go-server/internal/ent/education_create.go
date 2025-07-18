// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/education"
	"silan-backend/internal/ent/educationdetail"
	"silan-backend/internal/ent/educationtranslation"
	"silan-backend/internal/ent/user"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// EducationCreate is the builder for creating a Education entity.
type EducationCreate struct {
	config
	mutation *EducationMutation
	hooks    []Hook
}

// SetUserID sets the "user_id" field.
func (ec *EducationCreate) SetUserID(u uuid.UUID) *EducationCreate {
	ec.mutation.SetUserID(u)
	return ec
}

// SetInstitution sets the "institution" field.
func (ec *EducationCreate) SetInstitution(s string) *EducationCreate {
	ec.mutation.SetInstitution(s)
	return ec
}

// SetDegree sets the "degree" field.
func (ec *EducationCreate) SetDegree(s string) *EducationCreate {
	ec.mutation.SetDegree(s)
	return ec
}

// SetFieldOfStudy sets the "field_of_study" field.
func (ec *EducationCreate) SetFieldOfStudy(s string) *EducationCreate {
	ec.mutation.SetFieldOfStudy(s)
	return ec
}

// SetNillableFieldOfStudy sets the "field_of_study" field if the given value is not nil.
func (ec *EducationCreate) SetNillableFieldOfStudy(s *string) *EducationCreate {
	if s != nil {
		ec.SetFieldOfStudy(*s)
	}
	return ec
}

// SetStartDate sets the "start_date" field.
func (ec *EducationCreate) SetStartDate(t time.Time) *EducationCreate {
	ec.mutation.SetStartDate(t)
	return ec
}

// SetNillableStartDate sets the "start_date" field if the given value is not nil.
func (ec *EducationCreate) SetNillableStartDate(t *time.Time) *EducationCreate {
	if t != nil {
		ec.SetStartDate(*t)
	}
	return ec
}

// SetEndDate sets the "end_date" field.
func (ec *EducationCreate) SetEndDate(t time.Time) *EducationCreate {
	ec.mutation.SetEndDate(t)
	return ec
}

// SetNillableEndDate sets the "end_date" field if the given value is not nil.
func (ec *EducationCreate) SetNillableEndDate(t *time.Time) *EducationCreate {
	if t != nil {
		ec.SetEndDate(*t)
	}
	return ec
}

// SetIsCurrent sets the "is_current" field.
func (ec *EducationCreate) SetIsCurrent(b bool) *EducationCreate {
	ec.mutation.SetIsCurrent(b)
	return ec
}

// SetNillableIsCurrent sets the "is_current" field if the given value is not nil.
func (ec *EducationCreate) SetNillableIsCurrent(b *bool) *EducationCreate {
	if b != nil {
		ec.SetIsCurrent(*b)
	}
	return ec
}

// SetGpa sets the "gpa" field.
func (ec *EducationCreate) SetGpa(s string) *EducationCreate {
	ec.mutation.SetGpa(s)
	return ec
}

// SetNillableGpa sets the "gpa" field if the given value is not nil.
func (ec *EducationCreate) SetNillableGpa(s *string) *EducationCreate {
	if s != nil {
		ec.SetGpa(*s)
	}
	return ec
}

// SetLocation sets the "location" field.
func (ec *EducationCreate) SetLocation(s string) *EducationCreate {
	ec.mutation.SetLocation(s)
	return ec
}

// SetNillableLocation sets the "location" field if the given value is not nil.
func (ec *EducationCreate) SetNillableLocation(s *string) *EducationCreate {
	if s != nil {
		ec.SetLocation(*s)
	}
	return ec
}

// SetInstitutionWebsite sets the "institution_website" field.
func (ec *EducationCreate) SetInstitutionWebsite(s string) *EducationCreate {
	ec.mutation.SetInstitutionWebsite(s)
	return ec
}

// SetNillableInstitutionWebsite sets the "institution_website" field if the given value is not nil.
func (ec *EducationCreate) SetNillableInstitutionWebsite(s *string) *EducationCreate {
	if s != nil {
		ec.SetInstitutionWebsite(*s)
	}
	return ec
}

// SetInstitutionLogoURL sets the "institution_logo_url" field.
func (ec *EducationCreate) SetInstitutionLogoURL(s string) *EducationCreate {
	ec.mutation.SetInstitutionLogoURL(s)
	return ec
}

// SetNillableInstitutionLogoURL sets the "institution_logo_url" field if the given value is not nil.
func (ec *EducationCreate) SetNillableInstitutionLogoURL(s *string) *EducationCreate {
	if s != nil {
		ec.SetInstitutionLogoURL(*s)
	}
	return ec
}

// SetSortOrder sets the "sort_order" field.
func (ec *EducationCreate) SetSortOrder(i int) *EducationCreate {
	ec.mutation.SetSortOrder(i)
	return ec
}

// SetNillableSortOrder sets the "sort_order" field if the given value is not nil.
func (ec *EducationCreate) SetNillableSortOrder(i *int) *EducationCreate {
	if i != nil {
		ec.SetSortOrder(*i)
	}
	return ec
}

// SetCreatedAt sets the "created_at" field.
func (ec *EducationCreate) SetCreatedAt(t time.Time) *EducationCreate {
	ec.mutation.SetCreatedAt(t)
	return ec
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (ec *EducationCreate) SetNillableCreatedAt(t *time.Time) *EducationCreate {
	if t != nil {
		ec.SetCreatedAt(*t)
	}
	return ec
}

// SetUpdatedAt sets the "updated_at" field.
func (ec *EducationCreate) SetUpdatedAt(t time.Time) *EducationCreate {
	ec.mutation.SetUpdatedAt(t)
	return ec
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (ec *EducationCreate) SetNillableUpdatedAt(t *time.Time) *EducationCreate {
	if t != nil {
		ec.SetUpdatedAt(*t)
	}
	return ec
}

// SetID sets the "id" field.
func (ec *EducationCreate) SetID(u uuid.UUID) *EducationCreate {
	ec.mutation.SetID(u)
	return ec
}

// SetNillableID sets the "id" field if the given value is not nil.
func (ec *EducationCreate) SetNillableID(u *uuid.UUID) *EducationCreate {
	if u != nil {
		ec.SetID(*u)
	}
	return ec
}

// SetUser sets the "user" edge to the User entity.
func (ec *EducationCreate) SetUser(u *User) *EducationCreate {
	return ec.SetUserID(u.ID)
}

// AddTranslationIDs adds the "translations" edge to the EducationTranslation entity by IDs.
func (ec *EducationCreate) AddTranslationIDs(ids ...uuid.UUID) *EducationCreate {
	ec.mutation.AddTranslationIDs(ids...)
	return ec
}

// AddTranslations adds the "translations" edges to the EducationTranslation entity.
func (ec *EducationCreate) AddTranslations(e ...*EducationTranslation) *EducationCreate {
	ids := make([]uuid.UUID, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return ec.AddTranslationIDs(ids...)
}

// AddDetailIDs adds the "details" edge to the EducationDetail entity by IDs.
func (ec *EducationCreate) AddDetailIDs(ids ...uuid.UUID) *EducationCreate {
	ec.mutation.AddDetailIDs(ids...)
	return ec
}

// AddDetails adds the "details" edges to the EducationDetail entity.
func (ec *EducationCreate) AddDetails(e ...*EducationDetail) *EducationCreate {
	ids := make([]uuid.UUID, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return ec.AddDetailIDs(ids...)
}

// Mutation returns the EducationMutation object of the builder.
func (ec *EducationCreate) Mutation() *EducationMutation {
	return ec.mutation
}

// Save creates the Education in the database.
func (ec *EducationCreate) Save(ctx context.Context) (*Education, error) {
	ec.defaults()
	return withHooks(ctx, ec.sqlSave, ec.mutation, ec.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (ec *EducationCreate) SaveX(ctx context.Context) *Education {
	v, err := ec.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ec *EducationCreate) Exec(ctx context.Context) error {
	_, err := ec.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ec *EducationCreate) ExecX(ctx context.Context) {
	if err := ec.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ec *EducationCreate) defaults() {
	if _, ok := ec.mutation.IsCurrent(); !ok {
		v := education.DefaultIsCurrent
		ec.mutation.SetIsCurrent(v)
	}
	if _, ok := ec.mutation.SortOrder(); !ok {
		v := education.DefaultSortOrder
		ec.mutation.SetSortOrder(v)
	}
	if _, ok := ec.mutation.CreatedAt(); !ok {
		v := education.DefaultCreatedAt()
		ec.mutation.SetCreatedAt(v)
	}
	if _, ok := ec.mutation.UpdatedAt(); !ok {
		v := education.DefaultUpdatedAt()
		ec.mutation.SetUpdatedAt(v)
	}
	if _, ok := ec.mutation.ID(); !ok {
		v := education.DefaultID()
		ec.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ec *EducationCreate) check() error {
	if _, ok := ec.mutation.UserID(); !ok {
		return &ValidationError{Name: "user_id", err: errors.New(`ent: missing required field "Education.user_id"`)}
	}
	if _, ok := ec.mutation.Institution(); !ok {
		return &ValidationError{Name: "institution", err: errors.New(`ent: missing required field "Education.institution"`)}
	}
	if v, ok := ec.mutation.Institution(); ok {
		if err := education.InstitutionValidator(v); err != nil {
			return &ValidationError{Name: "institution", err: fmt.Errorf(`ent: validator failed for field "Education.institution": %w`, err)}
		}
	}
	if _, ok := ec.mutation.Degree(); !ok {
		return &ValidationError{Name: "degree", err: errors.New(`ent: missing required field "Education.degree"`)}
	}
	if v, ok := ec.mutation.Degree(); ok {
		if err := education.DegreeValidator(v); err != nil {
			return &ValidationError{Name: "degree", err: fmt.Errorf(`ent: validator failed for field "Education.degree": %w`, err)}
		}
	}
	if v, ok := ec.mutation.FieldOfStudy(); ok {
		if err := education.FieldOfStudyValidator(v); err != nil {
			return &ValidationError{Name: "field_of_study", err: fmt.Errorf(`ent: validator failed for field "Education.field_of_study": %w`, err)}
		}
	}
	if _, ok := ec.mutation.IsCurrent(); !ok {
		return &ValidationError{Name: "is_current", err: errors.New(`ent: missing required field "Education.is_current"`)}
	}
	if v, ok := ec.mutation.Gpa(); ok {
		if err := education.GpaValidator(v); err != nil {
			return &ValidationError{Name: "gpa", err: fmt.Errorf(`ent: validator failed for field "Education.gpa": %w`, err)}
		}
	}
	if v, ok := ec.mutation.Location(); ok {
		if err := education.LocationValidator(v); err != nil {
			return &ValidationError{Name: "location", err: fmt.Errorf(`ent: validator failed for field "Education.location": %w`, err)}
		}
	}
	if v, ok := ec.mutation.InstitutionWebsite(); ok {
		if err := education.InstitutionWebsiteValidator(v); err != nil {
			return &ValidationError{Name: "institution_website", err: fmt.Errorf(`ent: validator failed for field "Education.institution_website": %w`, err)}
		}
	}
	if v, ok := ec.mutation.InstitutionLogoURL(); ok {
		if err := education.InstitutionLogoURLValidator(v); err != nil {
			return &ValidationError{Name: "institution_logo_url", err: fmt.Errorf(`ent: validator failed for field "Education.institution_logo_url": %w`, err)}
		}
	}
	if _, ok := ec.mutation.SortOrder(); !ok {
		return &ValidationError{Name: "sort_order", err: errors.New(`ent: missing required field "Education.sort_order"`)}
	}
	if _, ok := ec.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "Education.created_at"`)}
	}
	if _, ok := ec.mutation.UpdatedAt(); !ok {
		return &ValidationError{Name: "updated_at", err: errors.New(`ent: missing required field "Education.updated_at"`)}
	}
	if len(ec.mutation.UserIDs()) == 0 {
		return &ValidationError{Name: "user", err: errors.New(`ent: missing required edge "Education.user"`)}
	}
	return nil
}

func (ec *EducationCreate) sqlSave(ctx context.Context) (*Education, error) {
	if err := ec.check(); err != nil {
		return nil, err
	}
	_node, _spec := ec.createSpec()
	if err := sqlgraph.CreateNode(ctx, ec.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(*uuid.UUID); ok {
			_node.ID = *id
		} else if err := _node.ID.Scan(_spec.ID.Value); err != nil {
			return nil, err
		}
	}
	ec.mutation.id = &_node.ID
	ec.mutation.done = true
	return _node, nil
}

func (ec *EducationCreate) createSpec() (*Education, *sqlgraph.CreateSpec) {
	var (
		_node = &Education{config: ec.config}
		_spec = sqlgraph.NewCreateSpec(education.Table, sqlgraph.NewFieldSpec(education.FieldID, field.TypeUUID))
	)
	if id, ok := ec.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := ec.mutation.Institution(); ok {
		_spec.SetField(education.FieldInstitution, field.TypeString, value)
		_node.Institution = value
	}
	if value, ok := ec.mutation.Degree(); ok {
		_spec.SetField(education.FieldDegree, field.TypeString, value)
		_node.Degree = value
	}
	if value, ok := ec.mutation.FieldOfStudy(); ok {
		_spec.SetField(education.FieldFieldOfStudy, field.TypeString, value)
		_node.FieldOfStudy = value
	}
	if value, ok := ec.mutation.StartDate(); ok {
		_spec.SetField(education.FieldStartDate, field.TypeTime, value)
		_node.StartDate = value
	}
	if value, ok := ec.mutation.EndDate(); ok {
		_spec.SetField(education.FieldEndDate, field.TypeTime, value)
		_node.EndDate = value
	}
	if value, ok := ec.mutation.IsCurrent(); ok {
		_spec.SetField(education.FieldIsCurrent, field.TypeBool, value)
		_node.IsCurrent = value
	}
	if value, ok := ec.mutation.Gpa(); ok {
		_spec.SetField(education.FieldGpa, field.TypeString, value)
		_node.Gpa = value
	}
	if value, ok := ec.mutation.Location(); ok {
		_spec.SetField(education.FieldLocation, field.TypeString, value)
		_node.Location = value
	}
	if value, ok := ec.mutation.InstitutionWebsite(); ok {
		_spec.SetField(education.FieldInstitutionWebsite, field.TypeString, value)
		_node.InstitutionWebsite = value
	}
	if value, ok := ec.mutation.InstitutionLogoURL(); ok {
		_spec.SetField(education.FieldInstitutionLogoURL, field.TypeString, value)
		_node.InstitutionLogoURL = value
	}
	if value, ok := ec.mutation.SortOrder(); ok {
		_spec.SetField(education.FieldSortOrder, field.TypeInt, value)
		_node.SortOrder = value
	}
	if value, ok := ec.mutation.CreatedAt(); ok {
		_spec.SetField(education.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if value, ok := ec.mutation.UpdatedAt(); ok {
		_spec.SetField(education.FieldUpdatedAt, field.TypeTime, value)
		_node.UpdatedAt = value
	}
	if nodes := ec.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   education.UserTable,
			Columns: []string{education.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.UserID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ec.mutation.TranslationsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   education.TranslationsTable,
			Columns: []string{education.TranslationsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(educationtranslation.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ec.mutation.DetailsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   education.DetailsTable,
			Columns: []string{education.DetailsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(educationdetail.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// EducationCreateBulk is the builder for creating many Education entities in bulk.
type EducationCreateBulk struct {
	config
	err      error
	builders []*EducationCreate
}

// Save creates the Education entities in the database.
func (ecb *EducationCreateBulk) Save(ctx context.Context) ([]*Education, error) {
	if ecb.err != nil {
		return nil, ecb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(ecb.builders))
	nodes := make([]*Education, len(ecb.builders))
	mutators := make([]Mutator, len(ecb.builders))
	for i := range ecb.builders {
		func(i int, root context.Context) {
			builder := ecb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*EducationMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, ecb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ecb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, ecb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (ecb *EducationCreateBulk) SaveX(ctx context.Context) []*Education {
	v, err := ecb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ecb *EducationCreateBulk) Exec(ctx context.Context) error {
	_, err := ecb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ecb *EducationCreateBulk) ExecX(ctx context.Context) {
	if err := ecb.Exec(ctx); err != nil {
		panic(err)
	}
}
