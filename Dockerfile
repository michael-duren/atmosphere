FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# copy .csproj and restore as distinct layers
COPY "Atmosphere.sln" "Atmosphere.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
COPY "DataAccess/DataAccess.csproj" "DataAccess/DataAccess.csproj"

RUN dotnet restore "Atmosphere.sln"

# copy everything else and build app
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "API.dll"]

#FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443
#
#FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
#WORKDIR /src
#COPY ["API/API.csproj", "API/"]
#RUN dotnet restore "API/API.csproj"
#COPY . .
#WORKDIR "/src/API"
#RUN dotnet build "API.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "API.dll"]
