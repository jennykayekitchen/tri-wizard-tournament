CREATE TABLE [Users] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [EmailAddress] nvarchar(255) NOT NULL,
  [SchoolId] int NOT NULL,
  [AboutMe] nvarchar(255),
  [TotalPoints] int
)
GO

CREATE TABLE [Subjects] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Categories] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Schools] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [TotalPoints] int
)
GO

CREATE TABLE [Words] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [CategoryId] int NOT NULL
)
GO

CREATE TABLE [Games] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [TotalPoints] int,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [FavoriteSubjects] (
  [UserId] int PRIMARY KEY IDENTITY(1, 1),
  [SubjectId] int
)
GO

ALTER TABLE [Words] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id])
GO

ALTER TABLE [Games] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Users] ADD FOREIGN KEY ([SchoolId]) REFERENCES [Schools] ([Id])
GO

ALTER TABLE [FavoriteSubjects] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [FavoriteSubjects] ADD FOREIGN KEY ([SubjectId]) REFERENCES [Subjects] ([Id])
GO
