namespace go all_api

struct SendMessageRequest {
  1: string formData
  2: string formType
  3: bool sendResume
  4: string language
}

struct VerifyEmailRequest {
  1: string email
  2: string language
}

struct Contact {
  1: string type
  2: string value
}

struct SocialLink {
  1: string type
  2: string url
}

struct Section {
  1: string title
  2: list<string> content
}

struct ResumeData {
  1: string name
  2: string title
  3: string current
  4: list<Contact> contacts
  5: list<SocialLink> socialLinks
  6: map<string, Section> sections
}

struct UpdateResumeSectionRequest {
  1: string sectionKey
  2: list<string> LatestedData
  3: string language
}

struct Response {
  1: bool success
  2: string message
}

struct Project {
  1: i32 id
  2: string name
  3: string description
  4: list<string> tags
  5: i32 year
  6: string annualPlan
}

struct FetchProjectsResponse {
  1: list<Project> projects
}

struct FetchCategoriesResponse {
  1: list<string> categories
}

struct AnnualPlan {
  1: i32 year
  2: string name
  3: string description
  4: i32 projectCount
  5: list<string> objectives
  6: list<ProjectSummary> projects
}

struct ProjectSummary {
  1: i32 id
  2: string name
  3: string description
}

struct FetchGraphDataResponse {
  1: list<Node> nodes
  2: list<Link> links
}

struct Node {
  1: string id
  2: i32 group
}

struct Link {
  1: string source
  2: string target
  3: i32 value
}

struct LatestedItem {
  1: string category
  2: string date
  3: string title
  4: string content
}

struct FetchNewsResponse {
  1: list<LatestedItem> Latested
}

struct Message {
  1: string type
  2: string text
  3: string author
  4: string role
  5: string Company
  6: string Position
}

struct GetRecentMessagesResponse {
  1: list<Message> messages
}

struct GetRecentGoalResponse {
  1: list<string> recentThoughts
  2: list<string> expectedOpportunities
  3: Availability availabilityTimes
}

struct Availability {
  1: string daily
  2: string fullTime
}

struct AIResponse {
  1: string response
}

service AllAPIsService {
  // sendMessage.js APIs
  Response sendMessage(1: SendMessageRequest request)
  Response verifyEmail(1: VerifyEmailRequest request)

  // resumeApi.js APIs
  ResumeData fetchResumeData(1: string language)
  Response updateResumeSection(1: UpdateResumeSectionRequest request)

  // projectApi.js APIs
  FetchProjectsResponse fetchProjects(1: string language)
  FetchCategoriesResponse fetchCategories(1: string language)
  // 可根据需要继续添加其他 projectApi.js 的方法

  // newsApi.js APIs
  FetchNewsResponse fetchNews(1: string language)

  // getRecentMessages.js APIs
  GetRecentMessagesResponse getRecentMessages(1: string language)

  // getRecentGoal.js APIs
  GetRecentGoalResponse getRecentGoal(1: string language)

  // getAIResponse.js APIs
  AIResponse getAIResponse(1: string message, 2: string language)
}