// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"math"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/predicate"
	"silan-backend/internal/ent/researchproject"
	"silan-backend/internal/ent/researchprojecttranslation"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ResearchProjectTranslationQuery is the builder for querying ResearchProjectTranslation entities.
type ResearchProjectTranslationQuery struct {
	config
	ctx                 *QueryContext
	order               []researchprojecttranslation.OrderOption
	inters              []Interceptor
	predicates          []predicate.ResearchProjectTranslation
	withResearchProject *ResearchProjectQuery
	withLanguage        *LanguageQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the ResearchProjectTranslationQuery builder.
func (rptq *ResearchProjectTranslationQuery) Where(ps ...predicate.ResearchProjectTranslation) *ResearchProjectTranslationQuery {
	rptq.predicates = append(rptq.predicates, ps...)
	return rptq
}

// Limit the number of records to be returned by this query.
func (rptq *ResearchProjectTranslationQuery) Limit(limit int) *ResearchProjectTranslationQuery {
	rptq.ctx.Limit = &limit
	return rptq
}

// Offset to start from.
func (rptq *ResearchProjectTranslationQuery) Offset(offset int) *ResearchProjectTranslationQuery {
	rptq.ctx.Offset = &offset
	return rptq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (rptq *ResearchProjectTranslationQuery) Unique(unique bool) *ResearchProjectTranslationQuery {
	rptq.ctx.Unique = &unique
	return rptq
}

// Order specifies how the records should be ordered.
func (rptq *ResearchProjectTranslationQuery) Order(o ...researchprojecttranslation.OrderOption) *ResearchProjectTranslationQuery {
	rptq.order = append(rptq.order, o...)
	return rptq
}

// QueryResearchProject chains the current query on the "research_project" edge.
func (rptq *ResearchProjectTranslationQuery) QueryResearchProject() *ResearchProjectQuery {
	query := (&ResearchProjectClient{config: rptq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rptq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(researchprojecttranslation.Table, researchprojecttranslation.FieldID, selector),
			sqlgraph.To(researchproject.Table, researchproject.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, researchprojecttranslation.ResearchProjectTable, researchprojecttranslation.ResearchProjectColumn),
		)
		fromU = sqlgraph.SetNeighbors(rptq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryLanguage chains the current query on the "language" edge.
func (rptq *ResearchProjectTranslationQuery) QueryLanguage() *LanguageQuery {
	query := (&LanguageClient{config: rptq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := rptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := rptq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(researchprojecttranslation.Table, researchprojecttranslation.FieldID, selector),
			sqlgraph.To(language.Table, language.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, researchprojecttranslation.LanguageTable, researchprojecttranslation.LanguageColumn),
		)
		fromU = sqlgraph.SetNeighbors(rptq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first ResearchProjectTranslation entity from the query.
// Returns a *NotFoundError when no ResearchProjectTranslation was found.
func (rptq *ResearchProjectTranslationQuery) First(ctx context.Context) (*ResearchProjectTranslation, error) {
	nodes, err := rptq.Limit(1).All(setContextOp(ctx, rptq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{researchprojecttranslation.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (rptq *ResearchProjectTranslationQuery) FirstX(ctx context.Context) *ResearchProjectTranslation {
	node, err := rptq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first ResearchProjectTranslation ID from the query.
// Returns a *NotFoundError when no ResearchProjectTranslation ID was found.
func (rptq *ResearchProjectTranslationQuery) FirstID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = rptq.Limit(1).IDs(setContextOp(ctx, rptq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{researchprojecttranslation.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (rptq *ResearchProjectTranslationQuery) FirstIDX(ctx context.Context) uuid.UUID {
	id, err := rptq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single ResearchProjectTranslation entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one ResearchProjectTranslation entity is found.
// Returns a *NotFoundError when no ResearchProjectTranslation entities are found.
func (rptq *ResearchProjectTranslationQuery) Only(ctx context.Context) (*ResearchProjectTranslation, error) {
	nodes, err := rptq.Limit(2).All(setContextOp(ctx, rptq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{researchprojecttranslation.Label}
	default:
		return nil, &NotSingularError{researchprojecttranslation.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (rptq *ResearchProjectTranslationQuery) OnlyX(ctx context.Context) *ResearchProjectTranslation {
	node, err := rptq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only ResearchProjectTranslation ID in the query.
// Returns a *NotSingularError when more than one ResearchProjectTranslation ID is found.
// Returns a *NotFoundError when no entities are found.
func (rptq *ResearchProjectTranslationQuery) OnlyID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = rptq.Limit(2).IDs(setContextOp(ctx, rptq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{researchprojecttranslation.Label}
	default:
		err = &NotSingularError{researchprojecttranslation.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (rptq *ResearchProjectTranslationQuery) OnlyIDX(ctx context.Context) uuid.UUID {
	id, err := rptq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of ResearchProjectTranslations.
func (rptq *ResearchProjectTranslationQuery) All(ctx context.Context) ([]*ResearchProjectTranslation, error) {
	ctx = setContextOp(ctx, rptq.ctx, ent.OpQueryAll)
	if err := rptq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*ResearchProjectTranslation, *ResearchProjectTranslationQuery]()
	return withInterceptors[[]*ResearchProjectTranslation](ctx, rptq, qr, rptq.inters)
}

// AllX is like All, but panics if an error occurs.
func (rptq *ResearchProjectTranslationQuery) AllX(ctx context.Context) []*ResearchProjectTranslation {
	nodes, err := rptq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of ResearchProjectTranslation IDs.
func (rptq *ResearchProjectTranslationQuery) IDs(ctx context.Context) (ids []uuid.UUID, err error) {
	if rptq.ctx.Unique == nil && rptq.path != nil {
		rptq.Unique(true)
	}
	ctx = setContextOp(ctx, rptq.ctx, ent.OpQueryIDs)
	if err = rptq.Select(researchprojecttranslation.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (rptq *ResearchProjectTranslationQuery) IDsX(ctx context.Context) []uuid.UUID {
	ids, err := rptq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (rptq *ResearchProjectTranslationQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, rptq.ctx, ent.OpQueryCount)
	if err := rptq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, rptq, querierCount[*ResearchProjectTranslationQuery](), rptq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (rptq *ResearchProjectTranslationQuery) CountX(ctx context.Context) int {
	count, err := rptq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (rptq *ResearchProjectTranslationQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, rptq.ctx, ent.OpQueryExist)
	switch _, err := rptq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (rptq *ResearchProjectTranslationQuery) ExistX(ctx context.Context) bool {
	exist, err := rptq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the ResearchProjectTranslationQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (rptq *ResearchProjectTranslationQuery) Clone() *ResearchProjectTranslationQuery {
	if rptq == nil {
		return nil
	}
	return &ResearchProjectTranslationQuery{
		config:              rptq.config,
		ctx:                 rptq.ctx.Clone(),
		order:               append([]researchprojecttranslation.OrderOption{}, rptq.order...),
		inters:              append([]Interceptor{}, rptq.inters...),
		predicates:          append([]predicate.ResearchProjectTranslation{}, rptq.predicates...),
		withResearchProject: rptq.withResearchProject.Clone(),
		withLanguage:        rptq.withLanguage.Clone(),
		// clone intermediate query.
		sql:  rptq.sql.Clone(),
		path: rptq.path,
	}
}

// WithResearchProject tells the query-builder to eager-load the nodes that are connected to
// the "research_project" edge. The optional arguments are used to configure the query builder of the edge.
func (rptq *ResearchProjectTranslationQuery) WithResearchProject(opts ...func(*ResearchProjectQuery)) *ResearchProjectTranslationQuery {
	query := (&ResearchProjectClient{config: rptq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	rptq.withResearchProject = query
	return rptq
}

// WithLanguage tells the query-builder to eager-load the nodes that are connected to
// the "language" edge. The optional arguments are used to configure the query builder of the edge.
func (rptq *ResearchProjectTranslationQuery) WithLanguage(opts ...func(*LanguageQuery)) *ResearchProjectTranslationQuery {
	query := (&LanguageClient{config: rptq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	rptq.withLanguage = query
	return rptq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		ResearchProjectID uuid.UUID `json:"research_project_id,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.ResearchProjectTranslation.Query().
//		GroupBy(researchprojecttranslation.FieldResearchProjectID).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (rptq *ResearchProjectTranslationQuery) GroupBy(field string, fields ...string) *ResearchProjectTranslationGroupBy {
	rptq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &ResearchProjectTranslationGroupBy{build: rptq}
	grbuild.flds = &rptq.ctx.Fields
	grbuild.label = researchprojecttranslation.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		ResearchProjectID uuid.UUID `json:"research_project_id,omitempty"`
//	}
//
//	client.ResearchProjectTranslation.Query().
//		Select(researchprojecttranslation.FieldResearchProjectID).
//		Scan(ctx, &v)
func (rptq *ResearchProjectTranslationQuery) Select(fields ...string) *ResearchProjectTranslationSelect {
	rptq.ctx.Fields = append(rptq.ctx.Fields, fields...)
	sbuild := &ResearchProjectTranslationSelect{ResearchProjectTranslationQuery: rptq}
	sbuild.label = researchprojecttranslation.Label
	sbuild.flds, sbuild.scan = &rptq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a ResearchProjectTranslationSelect configured with the given aggregations.
func (rptq *ResearchProjectTranslationQuery) Aggregate(fns ...AggregateFunc) *ResearchProjectTranslationSelect {
	return rptq.Select().Aggregate(fns...)
}

func (rptq *ResearchProjectTranslationQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range rptq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, rptq); err != nil {
				return err
			}
		}
	}
	for _, f := range rptq.ctx.Fields {
		if !researchprojecttranslation.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if rptq.path != nil {
		prev, err := rptq.path(ctx)
		if err != nil {
			return err
		}
		rptq.sql = prev
	}
	return nil
}

func (rptq *ResearchProjectTranslationQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*ResearchProjectTranslation, error) {
	var (
		nodes       = []*ResearchProjectTranslation{}
		_spec       = rptq.querySpec()
		loadedTypes = [2]bool{
			rptq.withResearchProject != nil,
			rptq.withLanguage != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*ResearchProjectTranslation).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &ResearchProjectTranslation{config: rptq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, rptq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := rptq.withResearchProject; query != nil {
		if err := rptq.loadResearchProject(ctx, query, nodes, nil,
			func(n *ResearchProjectTranslation, e *ResearchProject) { n.Edges.ResearchProject = e }); err != nil {
			return nil, err
		}
	}
	if query := rptq.withLanguage; query != nil {
		if err := rptq.loadLanguage(ctx, query, nodes, nil,
			func(n *ResearchProjectTranslation, e *Language) { n.Edges.Language = e }); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (rptq *ResearchProjectTranslationQuery) loadResearchProject(ctx context.Context, query *ResearchProjectQuery, nodes []*ResearchProjectTranslation, init func(*ResearchProjectTranslation), assign func(*ResearchProjectTranslation, *ResearchProject)) error {
	ids := make([]uuid.UUID, 0, len(nodes))
	nodeids := make(map[uuid.UUID][]*ResearchProjectTranslation)
	for i := range nodes {
		fk := nodes[i].ResearchProjectID
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(researchproject.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "research_project_id" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}
func (rptq *ResearchProjectTranslationQuery) loadLanguage(ctx context.Context, query *LanguageQuery, nodes []*ResearchProjectTranslation, init func(*ResearchProjectTranslation), assign func(*ResearchProjectTranslation, *Language)) error {
	ids := make([]string, 0, len(nodes))
	nodeids := make(map[string][]*ResearchProjectTranslation)
	for i := range nodes {
		fk := nodes[i].LanguageCode
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(language.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "language_code" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}

func (rptq *ResearchProjectTranslationQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := rptq.querySpec()
	_spec.Node.Columns = rptq.ctx.Fields
	if len(rptq.ctx.Fields) > 0 {
		_spec.Unique = rptq.ctx.Unique != nil && *rptq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, rptq.driver, _spec)
}

func (rptq *ResearchProjectTranslationQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(researchprojecttranslation.Table, researchprojecttranslation.Columns, sqlgraph.NewFieldSpec(researchprojecttranslation.FieldID, field.TypeUUID))
	_spec.From = rptq.sql
	if unique := rptq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if rptq.path != nil {
		_spec.Unique = true
	}
	if fields := rptq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, researchprojecttranslation.FieldID)
		for i := range fields {
			if fields[i] != researchprojecttranslation.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
		if rptq.withResearchProject != nil {
			_spec.Node.AddColumnOnce(researchprojecttranslation.FieldResearchProjectID)
		}
		if rptq.withLanguage != nil {
			_spec.Node.AddColumnOnce(researchprojecttranslation.FieldLanguageCode)
		}
	}
	if ps := rptq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := rptq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := rptq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := rptq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (rptq *ResearchProjectTranslationQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(rptq.driver.Dialect())
	t1 := builder.Table(researchprojecttranslation.Table)
	columns := rptq.ctx.Fields
	if len(columns) == 0 {
		columns = researchprojecttranslation.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if rptq.sql != nil {
		selector = rptq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if rptq.ctx.Unique != nil && *rptq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range rptq.predicates {
		p(selector)
	}
	for _, p := range rptq.order {
		p(selector)
	}
	if offset := rptq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := rptq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// ResearchProjectTranslationGroupBy is the group-by builder for ResearchProjectTranslation entities.
type ResearchProjectTranslationGroupBy struct {
	selector
	build *ResearchProjectTranslationQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (rptgb *ResearchProjectTranslationGroupBy) Aggregate(fns ...AggregateFunc) *ResearchProjectTranslationGroupBy {
	rptgb.fns = append(rptgb.fns, fns...)
	return rptgb
}

// Scan applies the selector query and scans the result into the given value.
func (rptgb *ResearchProjectTranslationGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, rptgb.build.ctx, ent.OpQueryGroupBy)
	if err := rptgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*ResearchProjectTranslationQuery, *ResearchProjectTranslationGroupBy](ctx, rptgb.build, rptgb, rptgb.build.inters, v)
}

func (rptgb *ResearchProjectTranslationGroupBy) sqlScan(ctx context.Context, root *ResearchProjectTranslationQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(rptgb.fns))
	for _, fn := range rptgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*rptgb.flds)+len(rptgb.fns))
		for _, f := range *rptgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*rptgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := rptgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// ResearchProjectTranslationSelect is the builder for selecting fields of ResearchProjectTranslation entities.
type ResearchProjectTranslationSelect struct {
	*ResearchProjectTranslationQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (rpts *ResearchProjectTranslationSelect) Aggregate(fns ...AggregateFunc) *ResearchProjectTranslationSelect {
	rpts.fns = append(rpts.fns, fns...)
	return rpts
}

// Scan applies the selector query and scans the result into the given value.
func (rpts *ResearchProjectTranslationSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, rpts.ctx, ent.OpQuerySelect)
	if err := rpts.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*ResearchProjectTranslationQuery, *ResearchProjectTranslationSelect](ctx, rpts.ResearchProjectTranslationQuery, rpts, rpts.inters, v)
}

func (rpts *ResearchProjectTranslationSelect) sqlScan(ctx context.Context, root *ResearchProjectTranslationQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(rpts.fns))
	for _, fn := range rpts.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*rpts.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := rpts.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
