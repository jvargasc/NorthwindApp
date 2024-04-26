FROM node:14 AS spa-builder
WORKDIR /src
EXPOSE 8080

COPY NorthwindApp.SPA/*.* ./
RUN npm install -g @angular/cli
WORKDIR /src/NorthwindApp.SPA
RUN ng build --output-path=dist/spa
COPY --from=builder /dist/spa /app/wwwroot
# COPY /dist/spa/*.* /app/wwwroot
# COPY --from=build-env /app .
# NorthwindApp.API/wwwroot

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
# WORKDIR /app

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
RUN dotnet build -c Release -o /app

#COPY /src/dist/spa/*.* /app/NorthwindApp.API/wwwroot
# WORKDIR /app
# COPY --from=spa-builder /src/dist/spa ./NorthwindApp.API/wwwroot

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
# COPY --from=spa-builder /src/dist/spa ./NorthwindApp.API/wwwroot
COPY --from=build-env /app .
ENTRYPOINT ["dotnet", "NorthwindApp.API.dll"]