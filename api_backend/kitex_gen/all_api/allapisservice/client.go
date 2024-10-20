// Code generated by Kitex v0.11.3. DO NOT EDIT.

package allapisservice

import (
	all_api "api_backend/kitex_gen/all_api"
	"context"
	client "github.com/cloudwego/kitex/client"
	callopt "github.com/cloudwego/kitex/client/callopt"
)

// Client is designed to provide IDL-compatible methods with call-option parameter for kitex framework.
type Client interface {
	SendMessage(ctx context.Context, request *all_api.SendMessageRequest, callOptions ...callopt.Option) (r *all_api.Response, err error)
	VerifyEmail(ctx context.Context, request *all_api.VerifyEmailRequest, callOptions ...callopt.Option) (r *all_api.Response, err error)
	FetchResumeData(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.ResumeData, err error)
	FetchProjects(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.FetchProjectsResponse, err error)
	FetchCategories(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.FetchCategoriesResponse, err error)
	FetchNews(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.FetchNewsResponse, err error)
	GetRecentMessages(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.GetRecentMessagesResponse, err error)
	GetRecentGoal(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.GetRecentGoalResponse, err error)
	GetAIResponse(ctx context.Context, message string, language string, callOptions ...callopt.Option) (r *all_api.AIResponse, err error)
}

// NewClient creates a client for the service defined in IDL.
func NewClient(destService string, opts ...client.Option) (Client, error) {
	var options []client.Option
	options = append(options, client.WithDestService(destService))

	options = append(options, opts...)

	kc, err := client.NewClient(serviceInfoForClient(), options...)
	if err != nil {
		return nil, err
	}
	return &kAllAPIsServiceClient{
		kClient: newServiceClient(kc),
	}, nil
}

// MustNewClient creates a client for the service defined in IDL. It panics if any error occurs.
func MustNewClient(destService string, opts ...client.Option) Client {
	kc, err := NewClient(destService, opts...)
	if err != nil {
		panic(err)
	}
	return kc
}

type kAllAPIsServiceClient struct {
	*kClient
}

func (p *kAllAPIsServiceClient) SendMessage(ctx context.Context, request *all_api.SendMessageRequest, callOptions ...callopt.Option) (r *all_api.Response, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.SendMessage(ctx, request)
}

func (p *kAllAPIsServiceClient) VerifyEmail(ctx context.Context, request *all_api.VerifyEmailRequest, callOptions ...callopt.Option) (r *all_api.Response, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.VerifyEmail(ctx, request)
}

func (p *kAllAPIsServiceClient) FetchResumeData(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.ResumeData, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.FetchResumeData(ctx, language)
}

func (p *kAllAPIsServiceClient) FetchProjects(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.FetchProjectsResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.FetchProjects(ctx, language)
}

func (p *kAllAPIsServiceClient) FetchCategories(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.FetchCategoriesResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.FetchCategories(ctx, language)
}

func (p *kAllAPIsServiceClient) FetchNews(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.FetchNewsResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.FetchNews(ctx, language)
}

func (p *kAllAPIsServiceClient) GetRecentMessages(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.GetRecentMessagesResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetRecentMessages(ctx, language)
}

func (p *kAllAPIsServiceClient) GetRecentGoal(ctx context.Context, language string, callOptions ...callopt.Option) (r *all_api.GetRecentGoalResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetRecentGoal(ctx, language)
}

func (p *kAllAPIsServiceClient) GetAIResponse(ctx context.Context, message string, language string, callOptions ...callopt.Option) (r *all_api.AIResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetAIResponse(ctx, message, language)
}
