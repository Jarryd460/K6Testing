var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.K6Testing>("k6testing");

builder.Build().Run();
