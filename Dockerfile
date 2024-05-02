FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /src
EXPOSE 8080

# copy csproj and restore as distinct layers
WORKDIR /src
COPY NorthwindApp.sln ./
COPY NorthwindApp.Core/*.csproj ./
COPY NorthwindApp.Infrastructure/*.csproj ./
COPY NorthwindApp.API/*.csproj ./

# copy everything else and build
COPY . .
WORKDIR /src/NorthwindApp.Core
RUN dotnet build -c Release -o /app

WORKDIR /src/NorthwindApp.Infrastructure
RUN dotnet build -c Release -o /app

WORKDIR /src/NorthwindApp.API
RUN dotnet publish -c Release -o /app

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app

COPY --from=build-env /app .
ENTRYPOINT ["dotnet", "NorthwindApp.API.dll"]