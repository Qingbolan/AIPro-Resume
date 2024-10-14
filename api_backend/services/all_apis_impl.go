package services

import (
	"context"
	"api_backend/kitex_gen/all_api"
	"strings"
)

type AllAPIsServiceImpl struct{}

// sendMessage
func (s *AllAPIsServiceImpl) SendMessage(ctx context.Context, req *all_api.SendMessageRequest) (*all_api.Response, error) {
	var message string
	if req.Language == "zh" {
		message = "消息发送成功！"
	} else {
		message = "Message sent successfully!"
	}
	return &all_api.Response{
		Success: true,
		Message: message,
	}, nil
}

// verifyEmail
func (s *AllAPIsServiceImpl) VerifyEmail(ctx context.Context, req *all_api.VerifyEmailRequest) (*all_api.Response, error) {
	var message string
	if req.Language == "zh" {
		message = "邮箱验证成功！"
	} else {
		message = "Email verified successfully!"
	}
	return &all_api.Response{
		Success: true,
		Message: message,
	}, nil
}

// fetchResumeData
func (s *AllAPIsServiceImpl) FetchResumeData(ctx context.Context, language string) (*all_api.ResumeData, error) {
	if language == "zh" {
		return &resumeDataZH, nil
	}
	return &resumeDataEN, nil
}

// updateResumeSection
func (s *AllAPIsServiceImpl) UpdateResumeSection(ctx context.Context, req *all_api.UpdateResumeSectionRequest) (*all_api.Response, error) {
	var dataMap map[string]*all_api.Section
	if req.Language == "zh" {
		dataMap = resumeDataZH.Sections
	} else {
		dataMap = resumeDataEN.Sections
	}

	section, exists := dataMap[req.SectionKey]
	if !exists {
		return &all_api.Response{
			Success: false,
			Message: "Section not found",
		}, nil
	}

	section.Content = req.LatestedData

	return &all_api.Response{
		Success: true,
		Message: "Section updated successfully",
	}, nil
}

// fetchProjects
func (s *AllAPIsServiceImpl) FetchProjects(ctx context.Context, language string) (*all_api.FetchProjectsResponse, error) {
	var projectsList []*all_api.Project
	if language == "zh" {
		projectsList = projectsZH
	} else {
		projectsList = projectsEN
	}
	return &all_api.FetchProjectsResponse{
		Projects: projectsList,
	}, nil
}

// fetchCategories
func (s *AllAPIsServiceImpl) FetchCategories(ctx context.Context, language string) (*all_api.FetchCategoriesResponse, error) {
	var categories []string
	if language == "zh" {
		categories = []string{"所有", "研究", "网页应用", "移动应用", "AI 项目", "工具"}
	} else {
		categories = []string{"All", "Research", "Web Apps", "Mobile Apps", "AI Projects", "Tools"}
	}
	return &all_api.FetchCategoriesResponse{
		Categories: categories,
	}, nil
}

// fetchNews
func (s *AllAPIsServiceImpl) FetchNews(ctx context.Context, language string) (*all_api.FetchNewsResponse, error) {
	if language == "zh" {
		newsList := []*all_api.LatestedItem{
			{
				Category: "researchProgress",
				Date:     "2024-03-20",
				Title:    "探索AI模型复杂推理能力的基准",
				Content:  "正在研究适合评估OpenAI ChatGPT-4等先进AI模型复杂推理能力的基准。",
			},
			{
				Category: "projectProgress",
				Date:     "2024-03-15",
				Title:    "AI个人网站项目进行中",
				Content:  "正在开发一个现代化、符合个人期望的AI网站。",
			},
			{
				Category: "academicAchievement",
				Date:     "2024-03-10",
				Title:    "CS5223分布式系统项目获得满分",
				Content:  "使用Kitex和Fyne(Go)成功完成CS5223课程项目，取得满分成绩。",
			},
			{
				Category: "personalDevelopment",
				Date:     "2024-03-05",
				Title:    "思考未来读博可能性",
				Content:  "正在反思AI和复杂系统领域的潜在博士研究方向和机会。",
			},
			{
				Category: "projectProgress",
				Date:     "2024-03-01",
				Title:    "CS5228 Kaggle比赛更新",
				Content:  "在新加坡二手车价格预测比赛中，目前RMSE为20000，排名36人中第8。",
			},
			{
				Category: "researchIdeas",
				Date:     "2024-02-25",
				Title:    "探索动态知识图增强LLM",
				Content:  "研究使用动态知识图结构来提高LLM的成长性和个性化的方法。",
			},
			{
				Category: "personalDevelopment",
				Date:     "2024-02-20",
				Title:    "设计全面的个人知识和生活管理系统",
				Content:  "构思一套完整的方案，以高效管理个人知识和日常生活。",
			},
		}
		return &all_api.FetchNewsResponse{
			Latested: newsList,
		}, nil
	}

	newsList := []*all_api.LatestedItem{
		{
			Category: "researchProgress",
			Date:     "2024-03-20",
			Title:    "Exploring benchmarks for complex reasoning in AI models",
			Content:  "Currently investigating benchmarks suitable for evaluating complex reasoning capabilities in advanced AI models like OpenAI's ChatGPT-4.",
		},
		{
			Category: "projectProgress",
			Date:     "2024-03-15",
			Title:    "AI personal website project underway",
			Content:  "Developing a modern, personalized AI website that aligns with my vision and expectations.",
		},
		{
			Category: "academicAchievement",
			Date:     "2024-03-10",
			Title:    "Perfect score in CS5223 Distributed Systems project",
			Content:  "Successfully completed the CS5223 course project using Kitex and Fyne (Go), achieving full marks.",
		},
		{
			Category: "personalDevelopment",
			Date:     "2024-03-05",
			Title:    "Contemplating future PhD possibilities",
			Content:  "Reflecting on potential paths for doctoral studies and research opportunities in AI and complex systems.",
		},
		{
			Category: "projectProgress",
			Date:     "2024-03-01",
			Title:    "CS5228 Kaggle competition update",
			Content:  "Currently ranked 8th out of 36 in the Singapore used car price prediction competition with an RMSE of 20000.",
		},
		{
			Category: "researchIdeas",
			Date:     "2024-02-25",
			Title:    "Exploring dynamic knowledge graphs for LLM enhancement",
			Content:  "Investigating methods to improve LLM growth and personalization using dynamic knowledge graph structures.",
		},
		{
			Category: "personalDevelopment",
			Date:     "2024-02-20",
			Title:    "Designing comprehensive personal knowledge and life management system",
			Content:  "Conceptualizing an integrated approach to manage personal knowledge and daily life efficiently.",
		},
	}
	return &all_api.FetchNewsResponse{
		Latested: newsList,
	}, nil
}

// getRecentMessages
func (s *AllAPIsServiceImpl) GetRecentMessages(ctx context.Context, language string) (*all_api.GetRecentMessagesResponse, error) {
	if language == "zh" {
		messages := []*all_api.Message{
			{
				Type:   "general",
				Text:   "在您最新的项目上做得很好！",
				Author: "John Doe",
				Role:   "UX设计师",
			},
			{
				Type:     "job",
				Company:  "TechCorp",
				Position: "高级AI开发人员",
				Text:     "我们有一个令人兴奋的AI专家机会。",
				Author:   "Jane Smith",
				Role:     "人力资源经理",
			},
			{
				Type:   "general",
				Text:   "很想在研究论文上合作。",
				Author: "Dr. Emily Brown",
				Role:   "研究科学家",
			},
			{
				Type:     "job",
				Company:  "InnovateLab",
				Position: "机器学习工程师",
				Text:     "加入我们前沿的机器学习团队！",
				Author:   "Mike Johnson",
				Role:     "技术主管",
			},
		}
		return &all_api.GetRecentMessagesResponse{
			Messages: messages,
		}, nil
	}

	messages := []*all_api.Message{
		{
			Type:   "general",
			Text:   "Great work on your latest project!",
			Author: "John Doe",
			Role:   "UX Designer",
		},
		{
			Type:     "job",
			Company:  "TechCorp",
			Position: "Senior AI Developer",
			Text:     "We have an exciting opportunity for an AI expert.",
			Author:   "Jane Smith",
			Role:     "HR Manager",
		},
		{
			Type:   "general",
			Text:   "Would love to collaborate on a research paper.",
			Author: "Dr. Emily Brown",
			Role:   "Research Scientist",
		},
		{
			Type:     "job",
			Company:  "InnovateLab",
			Position: "ML Engineer",
			Text:     "Join our cutting-edge machine learning team!",
			Author:   "Mike Johnson",
			Role:     "Tech Lead",
		},
	}
	return &all_api.GetRecentMessagesResponse{
		Messages: messages,
	}, nil
}

// getRecentGoal 方法的实现
func (s *AllAPIsServiceImpl) GetRecentGoal(ctx context.Context, language string) (*all_api.GetRecentGoalResponse, error) {
	var recentThoughts []string
	var expectedOpportunities []string
	var availability all_api.Availability

	if language == "zh" {
		recentThoughts = []string{
			"探索人工智能与人类创造力的交叉点",
			"研究大型语言模型的伦理影响",
			"开发更高效的神经网络架构",
		}
		expectedOpportunities = []string{
			"领先科技公司的人工智能研究科学家职位",
			"自然语言处理领域的协作项目",
			"为开源人工智能项目做贡献的机会",
			"涉及开发伦理人工智能系统的角色",
		}
		availability = all_api.Availability{
			Daily:     "4-6小时",
			FullTime: "从2024年9月1日起全职可用",
		}
	} else {
		recentThoughts = []string{
			"Exploring the intersection of AI and human creativity",
			"Investigating the ethical implications of large language models",
			"Developing more efficient neural network architectures",
		}
		expectedOpportunities = []string{
			"AI Research Scientist position in a leading tech company",
			"Collaborative projects on natural language processing",
			"Opportunities to contribute to open-source AI projects",
			"Roles involving the development of ethical AI systems",
		}
		availability = all_api.Availability{
			Daily:     "4-6 hours",
			FullTime: "Available from September 1st, 2024",
		}
	}

	return &all_api.GetRecentGoalResponse{
		RecentThoughts:       recentThoughts,
		ExpectedOpportunities: expectedOpportunities,
		AvailabilityTimes:    &availability,
	}, nil
}

// getAIResponse 方法的实现
func (s *AllAPIsServiceImpl) GetAIResponse(ctx context.Context, message string, language string) (*all_api.AIResponse, error) {
	var response string
	if language == "zh" {
		response = `谢谢您的消息：“` + message + `”。我还能为您做些什么？`
		response = strings.ReplaceAll(response, "”", "\"")
	} else {
		response = `Thank you for your message: "` + message + `". How else can I assist you?`
		response = strings.ReplaceAll(response, "“", "\"")
	}
	return &all_api.AIResponse{
		Response: response,
	}, nil
}