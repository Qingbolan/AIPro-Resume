package services
import (
	"api_backend/kitex_gen/all_api"
)

var resumeDataEN = all_api.ResumeData{
	Name:    "Silan Hu",
	Title:   "AI Researcher & Full Stack Developer",
	Current: "looking for PhD, internships and research opportunities",
	Contacts: []*all_api.Contact{
		{Type: "email", Value: "Silan.Hu@u.nus.edu"},
		{Type: "phone", Value: "+65 86986181"},
		{Type: "location", Value: "Singapore🇸🇬 / Beijing, China🇨🇳"},
	},
	SocialLinks: []*all_api.SocialLink{
		{Type: "linkedin", Url: "https://linkedin.com/in/qingbolan"},
		{Type: "github", Url: "https://github.com/Qingbolan"},
	},
	Sections: &all_api.ResumeSections{
		Education: &all_api.EducationSection{
			Title: "Education",
			Content: []*all_api.EducationItem{
				{
					School:  "National University of Singapore (NUS)",
					Degree:  "Master of Computing (ARTIFICIAL INTELLIGENCE specialization)",
					Date:    "Aug 2024 – Future (Dec 2025)",
					Details: []string{},
				},
				{
					School: "Macau University of Science and Technology (MUST)",
					Degree: "Bachelor of Science in Computer Science (Minor in Artificial Intelligence)",
					Date:   "Sep 2020 – Jun 2024",
					Details: []string{
						"GPA: 3.76/4 (Ranked in top 5%, 4/160+)",
						"Received full scholarship of 250,000 CNY for Master's program",
						"Dean's List Student",
						"Vice President of Computer Science and Engineering Student Association",
						"Core Courses: Graduation Project (A+), Machine Learning (A+), Computer Programming (A+), Data Structures (A), Digital Logic (A+), Database Systems (A+), etc.",
					},
				},
			},
		},
		Publications: &all_api.Section{
			Title: "Publications",
			Content: []string{
				"Hu, S., & Wang, X. (2024). FOKE: A Personalized and Explainable Education Framework Integrating Foundation Models, Knowledge Graphs, and Prompt Engineering. Communications in Computer and Information Science, vol 2161. Springer.",
				"Qiu, Y., Liu, H., Lin, Y., Hu, S., Wei, W., & Wang, X. (2023, December). Knowledge-graph relation extraction for Chinese business datasets. In AHPCAI 2023 (Vol. 12941, pp. 678-687). SPIE.",
				"Shen, M., Chen, D., Hu, S., & Xu, G. (2023). Class incremental learning of remote sensing images based on class similarity distillation. PeerJ Computer Science, 9, e1583.",
			},
		},
		Research: &all_api.ResearchSection{
			Title: "Research",
			Content: []*all_api.ResearchItem{
				{
					Title:    "FOKE: A Personalized and Explainable Education Framework",
					Location: "Beijing, China",
					Date:     "Jan 2024 – Mar 2024",
					Details:  []string{"Proposed a new framework applying LLMs to personalized education and developed practical application products."},
				},
				{
					Title:    "Knowledge-Graph Relation Extraction for Chinese Business Datasets",
					Location: "Online",
					Date:     "Jun 2023 – Aug 2023",
					Details:  []string{"Filtered and optimized high-quality data and trained existing relation extraction algorithms on the constructed KG."},
				},
				{
					Title:    "Point Cloud Recognition by 3D Lidar in a Hybrid Approach of ATSS and Big kernel",
					Location: "Macau, China",
					Date:     "Feb 2023 – Jun 2023",
					Details:  []string{"Validated on GAC Research Institute's cloud computing platform, our method excelled in real traffic scenarios such as high-speed driving and low-speed parking."},
				},
			},
		},
		Experience: &all_api.ExperienceSection{
			Title: "Experience",
			Content: []*all_api.ExperienceItem{
				{
					Company: "Beijing Stats City Data Technology Co., Ltd.",
					Role:    "Full Stack Engineer",
					Date:    "Jan 2024 – Sep 2024",
					Details: []string{
						"Scholar Hero: Led a student startup team to develop an AI-powered educational application. Currently, it has 300 users, received recognition and funding support from the Communication University of China, and attracted attention from top Chinese universities. Published a paper as the first author, with patents and software copyrights pending.",
					},
				},
				{
					Company: "Lenovo (Beijing) Co. Ltd",
					Role:    "Research Intern",
					Date:    "Jun 2023 – Sep 2023",
					Details: []string{
						"Knowledge and Training System: Led a team of 3 interns to fine-tune large language models and develop Lenovo's internal AI training system (intelligent recommendation and virtual teaching) using Flask and Vue3. Established the internal network for project deployment, configuring network equipment including NAS and computational resources.",
						"Stable Diffusion Launcher: This is the precursor to the AI image generation software pre-installed on Lenovo AI PCs.",
					},
				},
				{
					Company: "Ipsos China",
					Role:    "Market Research Analysis Intern",
					Date:    "Jul 2022 – Aug 2022",
					Details: []string{
						"Used Octopus crawler tool to collect product data for AIoT smart in-vehicle devices, extracted and analyzed questionnaire data using SPSS, and conducted industry surveys on current AIoT smart in-vehicle devices using Microsoft Excel.",
						"Gained familiarity with market research processes, improved data collection, organization, and analysis skills, and received the Outstanding Project Award for the market research internship project.",
					},
				},
				{
					Company: "Chaoyang District 'Youth Elite' Internship Program",
					Role:    "Summer Intern",
					Date:    "Jul 2021 – Aug 2021",
					Details: []string{
						"Participated in immersive learning experiences at HSBC Bank, Deloitte China, Siemens (China) Co., Ltd., and Beijing Greenenvision Technology Co., Ltd., gaining in-depth understanding of banking, risk and financial consulting, auditing, management consulting, corporate structure, and AI technologies.",
						"Gained comprehensive understanding of operations and culture in renowned companies, expanded skills in finance, management, auditing, and artificial intelligence, and improved practical abilities in case analysis and business plan development.",
					},
				},
			},
		},
		Awards: &all_api.Section{
			Title: "Awards",
			Content: []string{
				"Oct 2023 Verified Certificate - LLM102x: Large Language Models (Awarded by Databricks & edX)",
				"Dec 2022 Dean's Merit in Macau University of Science and Technology (TOP 5%)",
				"Sep 2022 2022 Macau Cybersecurity Technology Competition – University Division Distinction Award",
				"May 2022 2022 Greater Bay Area IT Application System Development Competition - Finalist Award (TOP 6 Teams)",
				"Oct 2021 First Prize of the Macao University of Science and Technology's Cultural and Academic Excellence Award",
				"Apr 2021 Global Entrepreneurship Exchange - Spring 2021，Third place team (Top 5%/20 Countries, 81 Teams)",
			},
		},
		Skills: &all_api.Section{
			Title: "Skills",
			Content: []string{
				"Python", "C/C++", "Go", "PHP", "Machine Learning", "MySQL", "VUE3", "Android App Development", "Desktop Software Development", "Innovation",
			},
		},
	},
}

var resumeDataZH = all_api.ResumeData{
	Name:    "胡思蓝",
	Title:   "AI研究员 & 全栈开发工程师",
	Current: "正在寻找博士机会、实习和研究合作",
	Contacts: []*all_api.Contact{
		{Type: "email", Value: "Silan.Hu@u.nus.edu"},
		{Type: "phone", Value: "+65 86986181"},
		{Type: "location", Value: "新加坡🇸🇬 / 中国北京🇨🇳"},
	},
	SocialLinks: []*all_api.SocialLink{
		{Type: "linkedin", Url: "https://linkedin.com/in/qingbolan"},
		{Type: "github", Url: "https://github.com/Qingbolan"},
	},
	Sections: &all_api.ResumeSections{
		Education: &all_api.EducationSection{
			Title: "教育",
			Content: []*all_api.EducationItem{
				{
					School:  "新加坡国立大学 (NUS)",
					Degree:  "计算机硕士（人工智能专业）",
					Date:    "2024年8月 – 未来（2025年12月）",
					Details: []string{},
				},
				{
					School: "澳门科技大学（MUST）",
					Degree: "计算机科学学士（辅修人工智能）",
					Date:   "2020年9月 – 2024年6月",
					Details: []string{
						"GPA: 3.76/4（前5%，4/160+）",
						"获得硕士项目全额奖学金250,000 CNY",
						"院长优秀生",
						"计算机科学与工程学生会副主席",
						"核心课程：毕业项目（A+）、机器学习（A+）、计算机编程（A+）、数据结构（A）、数字逻辑（A+）、数据库系统（A+）等",
					},
				},
			},
		},
		Publications: &all_api.Section{
			Title: "发表论文",
			Content: []string{
				"Hu, S., & Wang, X. (2024). FOKE: A Personalized and Explainable Education Framework Integrating Foundation Models, Knowledge Graphs, and Prompt Engineering. Communications in Computer and Information Science, vol 2161. Springer.",
				"Qiu, Y., Liu, H., Lin, Y., Hu, S., Wei, W., & Wang, X. (2023, December). Knowledge-graph relation extraction for Chinese business datasets. In AHPCAI 2023 (Vol. 12941, pp. 678-687). SPIE.",
				"Shen, M., Chen, D., Hu, S., & Xu, G. (2023). Class incremental learning of remote sensing images based on class similarity distillation. PeerJ Computer Science, 9, e1583.",
			},
		},
		Research: &all_api.ResearchSection{
			Title: "研究",
			Content: []*all_api.ResearchItem{
				{
					Title:    "FOKE：一个个性化且可解释的教育框架",
					Location: "中国北京",
					Date:     "2024年1月 – 2024年3月",
					Details:  []string{"提出了一个将大型语言模型应用于个性化教育的新框架，并开发了实用的应用产品。"},
				},
				{
					Title:    "中国商业数据集的知识图谱关系抽取",
					Location: "在线",
					Date:     "2023年6月 – 2023年8月",
					Details:  []string{"筛选和优化高质量数据，并在构建的知识图谱上训练现有的关系抽取算法。"},
				},
				{
					Title:    "基于ATSS和大内核的混合方法进行3D激光雷达点云识别",
					Location: "中国澳门",
					Date:     "2023年2月 – 2023年6月",
					Details:  []string{"在广汽研究院的云计算平台上验证，我们的方法在高速驾驶和低速停车等真实交通场景中表现出色。"},
				},
			},
		},
		Experience: &all_api.ExperienceSection{
			Title: "工作经验",
			Content: []*all_api.ExperienceItem{
				{
					Company: "北京统计之都数据科技有限公司",
					Role:    "全栈工程师",
					Date:    "2024年1月 – 2024年9月",
					Details: []string{
						"Scholar Hero：领导一个学生创业团队开发AI驱动的教育应用。目前拥有300名用户，获得中国传媒大学的认可和资金支持，并吸引了中国顶尖大学的关注。作为第一作者发表论文，正在申请专利和软件版权。",
					},
				},
				{
					Company: "联想（北京）有限公司",
					Role:    "研究实习生",
					Date:    "2023年6月 – 2023年9月",
					Details: []string{
						"知识与培训系统：领导一个3名实习生的团队微调大型语言模型，并使用Flask和Vue3开发联想内部的AI培训系统（智能推荐与虚拟教学）。建立项目部署的内部网络，配置包括NAS和计算资源在内的网络设备。",
						"Stable Diffusion Launcher：这是联想AI PC预装的AI图像生成软件的前身。",
					},
				},
				{
					Company: "益普索中国",
					Role:    "市场研究分析实习生",
					Date:    "2022年7月 – 2022年8月",
					Details: []string{
						"使用Octopus爬虫工具收集AIoT智能车载设备的产品数据，使用SPSS提取和分析问卷数据，并使用Microsoft Excel进行当前AIoT智能车载设备的行业调查。",
						"熟悉市场研究流程，提升了数据收集、组织和分析能力，并因市场研究实习项目获得优秀项目奖。",
					},
				},
				{
					Company: "朝阳区'青年精英'实习计划",
					Role:    "暑期实习生",
					Date:    "2021年7月 – 2021年8月",
					Details: []string{
						"在汇丰银行、德勤中国、西门子（中国）有限公司和北京Greenenvision科技有限公司参与沉浸式学习体验，深入了解银行、风险与金融咨询、审计、管理咨询、企业结构和AI技术。",
						"全面了解知名公司的运营和文化，扩展了在金融、管理、审计和人工智能方面的技能，并提升了案例分析和商业计划开发的实战能力。",
					},
				},
			},
		},
		Awards: &all_api.Section{
			Title: "奖项",
			Content: []string{
				"2023年10月 验证证书 - LLM102x：大型语言模型（由Databricks & edX颁发）",
				"2022年12月 澳门科技大学院长奖学金（前5%）",
				"2022年9月 2022澳门网络安全技术竞赛 – 大学组优秀奖",
				"2022年5月 2022大湾区IT应用系统开发竞赛 - 入围奖（前6支团队）",
				"2021年10月 澳门科技大学文化及学术优秀奖一等奖",
				"2021年4月 全球创业交流 - 2021春季，团队第三名（前5% / 20个国家，81支团队）",
			},
		},
		Skills: &all_api.Section{
			Title: "技能",
			Content: []string{
				"Python", "C/C++", "Go", "PHP", "机器学习", "MySQL", "VUE3", "Android应用开发", "桌面软件开发", "创新",
			},
		},
	},
}

var projectsEN = []*all_api.Project{
	{
		Id:          1,
		Name:        "AI Chatbot",
		Description: "An intelligent chatbot using natural language processing techniques to provide human-like interactions.",
		Tags:        []string{"AI", "NLP", "Python"},
		Year:        2023,
		AnnualPlan:  "ZIYUN2024",
	},
	{
		Id:          2,
		Name:        "E-commerce Platform",
		Description: "A full-stack online shopping platform with user authentication, product catalog, and secure payment integration.",
		Tags:        []string{"Web", "React", "Node.js"},
		Year:        2022,
		AnnualPlan:  "WENXIN2022",
	},
	{
		Id:          3,
		Name:        "Data Visualization Tool",
		Description: "Interactive data visualizations using D3.js to represent complex datasets in an intuitive and engaging manner.",
		Tags:        []string{"D3.js", "Data Science"},
		Year:        2024,
		AnnualPlan:  "ZIYUN2024",
	},
	{
		Id:          4,
		Name:        "Mobile Fitness App",
		Description: "A cross-platform mobile application for tracking workouts, nutrition, and personal fitness goals.",
		Tags:        []string{"Mobile", "React Native", "Firebase"},
		Year:        2021,
		AnnualPlan:  "WANXIANG2021",
	},
	{
		Id:          5,
		Name:        "Blockchain Voting System",
		Description: "A decentralized voting system using blockchain technology to ensure transparency and security in elections.",
		Tags:        []string{"Blockchain", "Solidity", "Web3"},
		Year:        2023,
		AnnualPlan:  "YANGFAN2023",
	},
}

var projectsZH = []*all_api.Project{
	{
		Id:          1,
		Name:        "AI 聊天机器人",
		Description: "使用自然语言处理技术提供类人交互的智能聊天机器人。",
		Tags:        []string{"AI", "NLP", "Python"},
		Year:        2023,
		AnnualPlan:  "ZIYUN2024",
	},
	{
		Id:          2,
		Name:        "电子商务平台",
		Description: "一个具有用户认证、产品目录和安全支付集成的全栈在线购物平台。",
		Tags:        []string{"Web", "React", "Node.js"},
		Year:        2022,
		AnnualPlan:  "WENXIN2022",
	},
	{
		Id:          3,
		Name:        "数据可视化工具",
		Description: "使用D3.js进行交互式数据可视化，以直观和引人入胜的方式展示复杂数据集。",
		Tags:        []string{"D3.js", "数据科学"},
		Year:        2024,
		AnnualPlan:  "ZIYUN2024",
	},
	{
		Id:          4,
		Name:        "移动健身应用",
		Description: "用于跟踪锻炼、营养和个人健身目标的跨平台移动应用。",
		Tags:        []string{"移动", "React Native", "Firebase"},
		Year:        2021,
		AnnualPlan:  "WANXIANG2021",
	},
	{
		Id:          5,
		Name:        "区块链投票系统",
		Description: "使用区块链技术确保选举透明性和安全性的去中心化投票系统。",
		Tags:        []string{"区块链", "Solidity", "Web3"},
		Year:        2023,
		AnnualPlan:  "YANGFAN2023",
	},
}
