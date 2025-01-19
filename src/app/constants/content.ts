export const experiences = [
    {
        title: 'Winter Analyst',
        company: 'Millennium Management LLC',
        tools: ['Angular', 'Spring Boot','Java','PostgreSQL','EKS','S3','Docker'],
        description: [
              "Developed an event-driven file auditing solution for the core data team to optimize resource usage on report generation, integrating both legacy and modern data sources",
              "Optimised the ETL process to handle overlapping windows and backfilling via hashing and idempotent processing",
        ],
    },
    {
        title: 'Software Engineer Intern',
        company: 'GIC - Public Markets Data',
        tools: ['Angular', 'Spring Boot','Java','PostgreSQL','Openshift'],
        description: [
                "Automated data quality checks via pdf/excel report generation for risk & performance monitoring",
                "Wrote some scala to allow data stewards to upkeep hierarchical validity across the public markets portfolio universe",
                "Cut effort for manual developer intervention by integrating retry with exponential backoffs for scheduled jobs with external dependencies",
        ],
    },
    {
        title: 'Summer Analyst',
        company: 'Morgan Stanley',
        tools: ['Spring Boot', 'Java','Kafka','Microsoft Teams','Multi-threading'],
        description: [
            "Built a resilient and high throughput notification service using Spring Boot, Spring Kafka and Teams API",
            "Initiated performance testing and thread-to-partition tuning based on quantitative metrics gathered from data analysis",
            "Iterated on user feedback to incorporate features like integrated email shortcuts and batch processing to tackle spam",
        ],
      },
      {
        title: 'Software Engineer Intern',
        company: 'GIC - Fixed Income & Multi-Assets',
        tools: ['Angular', 'Spring Boot','Java','PostgreSQL','Openshift'],
        description: [
              "Collaborated with quants to refine and build statistical dashboards serving insights for portfolio managers",
              "Built features and workflows to help portfolio managers track rebalancing tasks on the internal platform",
              "Wrote a small orchestration script with docker compose to help developers set up their container workloads locally",
              "Built a redis cache utility decorator to optimize long-running functions and expensive file reads, benchmarked with a 75% latency drop on feather file reads across the deployed cluster",
        ],
      },
];