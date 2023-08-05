namespace Application.Presets.Effects.DTOs;

public class EffectQueryDto
{
    public int? Id { get; set; }
    public string PresetName { get; set; } = null!;
    public double Mix { get; set; }
    
    public double? Time { get; set; }
    public double? Feedback { get; set; }
    
    public double? Amount { get; set; }
    public double? FilterFrequency { get; set; }
    
    public double? Decay { get; set; }
    public double? PreDelay { get; set; }
}

public class DelayQueryDto : EffectQueryDto
{
    public new double Time { get; set; }
    public new double Feedback { get; set; }
}

public class DistortionQueryDto : EffectQueryDto
{
    public new double Amount { get; set; }
    public new double FilterFrequency { get; set; }
}

public class ReverbQueryDto : EffectQueryDto
{
    public new double Decay { get; set; }
    public new double PreDelay { get; set; }
}

