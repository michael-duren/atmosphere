namespace Application.Presets.Effects.DTOs;

public class EffectQueryDto
{
    public string AppUserId { get; set; } = null!;
    public int Id { get; set; }
    public string PresetName { get; set; } = null!;
    public double Mix { get; set; }
}

public class DelayQueryDto : EffectQueryDto
{
    public double Time { get; set; }
    public double Feedback { get; set; }
}

public class DistortionQueryDto : EffectQueryDto
{
    public double Amount { get; set; }
    public double Filter { get; set; }
}

public class ReverbQueryDto : EffectQueryDto
{
    public double Decay { get; set; }
    public double PreDelay { get; set; }
}

